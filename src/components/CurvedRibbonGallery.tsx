// CurvedRibbonGallery — WebGL fisheye image ribbon (horizontal or vertical)
// CMS or manual images, active crossfading background, 1:1 touch drag with fling,
// cached/capped textures, idle rendering, responsive scaling, static fallback.
import {
    startTransition,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type PointerEvent,
    type ReactNode,
} from "react"

type Orientation = "horizontal" | "vertical"

interface Props {
    collection?: ReactNode
    content?: {
        source: "CMS" | "Manual"
        images: Array<{ src?: string; alt?: string; href?: string } | string>
        enableLinks: boolean
    }
    interaction?: { captureScroll: boolean; glide: number }
    background?: {
        showActiveBackground: boolean
        bgFadeDuration: number
        bgOverlayColor: string
        backgroundColor: string
    }
    layout?: {
        orientation: Orientation
        responsive: boolean
        itemWidth: number
        itemHeight: number
        gap: number
    }
    effect?: { bulgeStrength: number; bulgeWidth: number }
}

type Mesh = {
    positionBuffer: WebGLBuffer
    uvBuffer: WebGLBuffer
    indexBuffer: WebGLBuffer
    indexCount: number
}
type GLResources = {
    ribbonProgram: WebGLProgram
    bgProgram: WebGLProgram
    meshH: Mesh
    meshV: Mesh
    bgMesh: Mesh
    rPos: number
    rUv: number
    bPos: number
    bUv: number
    ru: Record<string, WebGLUniformLocation | null>
    bu: Record<string, WebGLUniformLocation | null>
}
type RibbonItem = { src: string; href: string | null }
type LoadedTexture = { texture: WebGLTexture; width: number; height: number }
type RenderItem = { href: string | null; tex: LoadedTexture }
type Config = {
    vertical: boolean
    responsive: boolean
    itemWidth: number
    itemHeight: number
    gap: number
    bulgeStrength: number
    bulgeWidth: number
    showActiveBackground: boolean
    bgFadeDuration: number
    glide: number
}
type Layout = {
    iw: number
    ih: number
    alongSize: number
    crossSize: number
    viewLen: number
    stride: number
    n: number
    virtualCount: number
    total: number
    centerIndex: number
}

const defaultImages = Array.from(
    { length: 12 },
    (_, i) => `https://picsum.photos/seed/ribbon-${i + 1}/900/1200`
)

// ---------------- helpers ----------------

const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v))

function wrap(value: number, min: number, max: number) {
    const range = max - min
    if (range <= 0) return min
    let out = (value - min) % range
    if (out < 0) out += range
    return out + min
}

function parseRgba(value: string): [number, number, number, number] {
    const s = (value || "").trim()
    if (s.startsWith("#") && s.length === 7) {
        return [
            parseInt(s.slice(1, 3), 16) / 255,
            parseInt(s.slice(3, 5), 16) / 255,
            parseInt(s.slice(5, 7), 16) / 255,
            1,
        ]
    }
    const m = s.match(/rgba?\(([^)]+)\)/i)
    if (!m) return [0, 0, 0, 0.25]
    const p = m[1].split(",").map((x) => x.trim())
    return [
        clamp(Number(p[0] || 0), 0, 255) / 255,
        clamp(Number(p[1] || 0), 0, 255) / 255,
        clamp(Number(p[2] || 0), 0, 255) / 255,
        p.length > 3 ? clamp(Number(p[3] || 1), 0, 1) : 1,
    ]
}

// Picks the largest srcset candidate and asks Framer's CDN for a capped size.
function sizedImageUrl(value: string, maxSize: number): string {
    let original = (value || "").trim()
    if (!original) return ""
    const parts = original.split(",").map((x) => x.trim())
    if (parts.length > 1) {
        let bestW = -1
        let best = parts[0].split(/\s+/)[0]
        for (const c of parts) {
            const [url, d] = c.split(/\s+/)
            const w = d?.endsWith("w") ? Number(d.slice(0, -1)) : 0
            if (url && w >= bestW) {
                bestW = w
                best = url
            }
        }
        original = best
    } else {
        original = original.split(/\s+/)[0]
    }
    if (typeof window === "undefined") return original
    try {
        const url = new URL(original, window.location.href)
        if (url.hostname.includes("framerusercontent.com")) {
            ;["width", "height", "w", "h"].forEach((k) =>
                url.searchParams.delete(k)
            )
            url.searchParams.set(
                "scale-down-to",
                String(maxSize <= 1024 ? 1024 : 2048)
            )
        }
        return url.toString()
    } catch {
        return original
    }
}

function getLayout(
    cfg: Config,
    width: number,
    height: number,
    count: number
): Layout {
    const alongView = Math.max(1, cfg.vertical ? height : width)
    const crossView = Math.max(1, cfg.vertical ? width : height)
    const scale = cfg.responsive
        ? clamp(Math.min(alongView / 1200, crossView / 500), 0.55, 1)
        : 1
    const iw = cfg.itemWidth * scale
    const ih = cfg.itemHeight * scale
    const alongSize = cfg.vertical ? ih : iw
    const stride = Math.max(1, alongSize + cfg.gap * scale)
    const n = Math.max(1, count)
    const repeats = Math.max(
        1,
        Math.ceil((alongView * 1.6 + alongSize * 4) / (stride * n))
    )
    const virtualCount = n * repeats
    return {
        iw,
        ih,
        alongSize,
        crossSize: cfg.vertical ? iw : ih,
        viewLen: alongView,
        stride,
        n,
        virtualCount,
        total: stride * virtualCount,
        centerIndex: Math.floor(virtualCount / 2),
    }
}

function activeItemIndex(scroll: number, L: Layout) {
    let v = Math.round(L.centerIndex - scroll / L.stride)
    v = ((v % L.virtualCount) + L.virtualCount) % L.virtualCount
    return v % L.n
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
    const make = (type: number, src: string) => {
        const s = gl.createShader(type)
        if (!s) return null
        gl.shaderSource(s, src)
        gl.compileShader(s)
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.warn(
                "CurvedRibbonGallery shader error:",
                gl.getShaderInfoLog(s)
            )
            gl.deleteShader(s)
            return null
        }
        return s
    }
    const v = make(gl.VERTEX_SHADER, vs)
    const f = make(gl.FRAGMENT_SHADER, fs)
    if (!v || !f) return null
    const p = gl.createProgram()
    if (!p) return null
    gl.attachShader(p, v)
    gl.attachShader(p, f)
    gl.linkProgram(p)
    gl.deleteShader(v)
    gl.deleteShader(f)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.warn("CurvedRibbonGallery link error:", gl.getProgramInfoLog(p))
        gl.deleteProgram(p)
        return null
    }
    return p
}

// The bulge only varies along the scroll axis, so only that axis needs segments.
function createMesh(
    gl: WebGLRenderingContext,
    segX: number,
    segY: number,
    extent = 0.5
): Mesh | null {
    const pos: number[] = []
    const uv: number[] = []
    const idx: number[] = []
    for (let y = 0; y <= segY; y++) {
        for (let x = 0; x <= segX; x++) {
            const u = x / segX
            const v = y / segY
            pos.push((u - 0.5) * extent * 2, (v - 0.5) * extent * 2)
            uv.push(u, v)
        }
    }
    for (let y = 0; y < segY; y++) {
        for (let x = 0; x < segX; x++) {
            const i0 = y * (segX + 1) + x
            const i2 = i0 + segX + 1
            idx.push(i0, i2, i0 + 1, i0 + 1, i2, i2 + 1)
        }
    }
    const positionBuffer = gl.createBuffer()
    const uvBuffer = gl.createBuffer()
    const indexBuffer = gl.createBuffer()
    if (!positionBuffer || !uvBuffer || !indexBuffer) return null
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW)
    return { positionBuffer, uvBuffer, indexBuffer, indexCount: idx.length }
}

// Loads an image once, downsizing it before GPU upload if larger than maxSize.
function loadTexture(
    gl: WebGLRenderingContext,
    src: string,
    maxSize: number
): Promise<LoadedTexture | null> {
    return new Promise((resolve) => {
        const image = new Image()
        image.crossOrigin = "anonymous"
        image.decoding = "async"
        image.onload = () => {
            if (gl.isContextLost()) return resolve(null)
            let source: TexImageSource = image
            let width = image.naturalWidth || 1
            let height = image.naturalHeight || 1
            const largest = Math.max(width, height)
            if (largest > maxSize) {
                const r = maxSize / largest
                const c = document.createElement("canvas")
                c.width = Math.max(1, Math.round(width * r))
                c.height = Math.max(1, Math.round(height * r))
                const ctx = c.getContext("2d")
                if (ctx) {
                    ctx.imageSmoothingQuality = "high"
                    ctx.drawImage(image, 0, 0, c.width, c.height)
                    source = c
                    width = c.width
                    height = c.height
                }
            }
            const texture = gl.createTexture()
            if (!texture) return resolve(null)
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                source
            )
            resolve({ texture, width, height })
        }
        image.onerror = () => resolve(null)
        image.src = src
    })
}

// ---------------- shaders ----------------
// Vertex and fragment shaders share NO uniforms, so precision can never mismatch
// (mismatched precision makes the program fail on Safari / iOS / many Android GPUs).

const RIBBON_VERTEX = `
precision highp float;
attribute vec2 aPosition;
attribute vec2 aUv;
uniform vec2 uResolution;
uniform vec2 uItemSize;
uniform float uOffset;
uniform float uVertical;
uniform float uBulgeStrength;
uniform float uBulgeWidth;
varying vec2 vUv;
void main() {
    vec2 local = aPosition * uItemSize;
    float along = mix(local.x, -local.y, uVertical) + uOffset;
    float across = mix(local.y, local.x, uVertical);
    float alongSize = mix(uItemSize.x, uItemSize.y, uVertical);
    float halfLength = mix(uResolution.x, uResolution.y, uVertical) * 0.5;
    float n = along / halfLength;
    float sigma = max(0.0001, uBulgeWidth);
    float bulge = 1.0 + uBulgeStrength * exp(-(n * n) / (2.0 * sigma * sigma));
    across *= bulge;
    along += n * (bulge - 1.0) * alongSize * 0.9;
    vec2 world = uVertical > 0.5 ? vec2(across, -along) : vec2(along, across);
    gl_Position = vec4(world / (uResolution * 0.5), 0.0, 1.0);
    vUv = aUv;
}`

const COVER_FN = `
vec2 coverUv(vec2 uv, vec2 texSize, vec2 boxSize) {
    float ta = texSize.x / max(texSize.y, 0.0001);
    float ba = boxSize.x / max(boxSize.y, 0.0001);
    if (ta > ba) { float s = ba / ta; uv.x = uv.x * s + (1.0 - s) * 0.5; }
    else { float s = ta / ba; uv.y = uv.y * s + (1.0 - s) * 0.5; }
    return uv;
}`

const RIBBON_FRAGMENT = `
precision mediump float;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uBoxSize;
uniform vec2 uTexelSize;
uniform float uHovered;
varying vec2 vUv;
${COVER_FN}
void main() {
    vec2 uv = coverUv(vUv, uTextureSize, uBoxSize);
    vec4 color = texture2D(uTexture, uv);
    if (uHovered > 0.5) {
        // Lightweight five-tap blur, only on the hovered ribbon item.
        vec2 d = uTexelSize * 2.5;
        color = color * 0.36
          + texture2D(uTexture, uv + vec2(d.x, 0.0)) * 0.16
          + texture2D(uTexture, uv - vec2(d.x, 0.0)) * 0.16
          + texture2D(uTexture, uv + vec2(0.0, d.y)) * 0.16
          + texture2D(uTexture, uv - vec2(0.0, d.y)) * 0.16;
        // Desaturate strongly, then darken for readable white text.
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = mix(color.rgb, vec3(gray), 0.92);
        color.rgb *= 0.62;
    }
    gl_FragColor = color;
}`

const BG_VERTEX = `
precision highp float;
attribute vec2 aPosition;
attribute vec2 aUv;
varying vec2 vUv;
void main() { vUv = aUv; gl_Position = vec4(aPosition, 0.0, 1.0); }`

const BG_FRAGMENT = `
precision mediump float;
uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
uniform vec2 uFrameSize;
uniform vec2 uTextureSizeA;
uniform vec2 uTextureSizeB;
uniform float uMix;
uniform vec4 uOverlay;
varying vec2 vUv;
${COVER_FN}
void main() {
    vec3 a = texture2D(uTextureA, coverUv(vUv, uTextureSizeA, uFrameSize)).rgb;
    vec3 b = texture2D(uTextureB, coverUv(vUv, uTextureSizeB, uFrameSize)).rgb;
    vec3 color = mix(a, b, clamp(uMix, 0.0, 1.0));
    color = mix(color, uOverlay.rgb, clamp(uOverlay.a, 0.0, 1.0));
    gl_FragColor = vec4(color, 1.0);
}`

// ---------------- component ----------------

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 600
 */
export default function CurvedRibbonGallery(props: Props) {
    const {
        source = "CMS",
        images = defaultImages,
        enableLinks = false,
    } = props.content ?? ({} as NonNullable<Props["content"]>)
    const collection = props.collection
    const { captureScroll = true, glide = 3.5 } =
        props.interaction ?? ({} as NonNullable<Props["interaction"]>)
    const {
        showActiveBackground = false,
        bgFadeDuration = 300,
        bgOverlayColor = "rgba(0,0,0,0)",
    } = props.background ?? ({} as NonNullable<Props["background"]>)
    const {
        orientation = "horizontal",
        responsive = true,
        itemWidth = 350,
        itemHeight = 180,
        gap = 16,
    } = props.layout ?? ({} as NonNullable<Props["layout"]>)
    const { bulgeStrength = 1.2, bulgeWidth = 0.35 } =
        props.effect ?? ({} as NonNullable<Props["effect"]>)
    const vertical = orientation === "vertical"

    const containerRef = useRef<HTMLDivElement | null>(null)
    const hiddenCollectionRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const resourcesRef = useRef<GLResources | null>(null)
    const rafRef = useRef(0)
    const rafActiveRef = useRef(false)
    const renderItemsRef = useRef<RenderItem[]>([])
    const textureCacheRef = useRef(new Map<string, LoadedTexture>())
    const textureCapRef = useRef(1024)
    const loadGenerationRef = useRef(0)
    const texturesReadyRef = useRef(false)
    const sizeRef = useRef({ width: 1, height: 1 })
    const needsRenderRef = useRef(true)
    const lastDrawnScrollRef = useRef(Number.NaN)
    const lastFrameTimeRef = useRef(0)

    // scrolling
    const scrollRef = useRef(0)
    const targetScrollRef = useRef(0)
    const flingVelocityRef = useRef(0)
    const draggingRef = useRef(false)
    const pointerXRef = useRef(0)
    const pointerYRef = useRef(0)
    const lastMoveTimeRef = useRef(0)
    const pointerDownRef = useRef({ x: 0, y: 0, moved: false, href: "" })
    const hoverHrefRef = useRef("")
    const hoveredVirtualRef = useRef(-1)
    const hoverOverlayRef = useRef<HTMLDivElement | null>(null)

    // visibility
    const isVisibleRef = useRef(true)
    const isInViewRef = useRef(true)

    // background crossfade
    const bgDisplayedRef = useRef(0)
    const bgFromRef = useRef(0)
    const bgToRef = useRef(0)
    const bgStartRef = useRef(0)
    const bgProgressRef = useRef(1)
    const overlayRef = useRef<[number, number, number, number]>([0, 0, 0, 0.25])

    // CMS
    const latestJoinedRef = useRef("")
    const cmsExtractedRef = useRef(false)
    const observerRef = useRef<MutationObserver | null>(null)
    const debounceRef = useRef(0)
    const cmsWarnedRef = useRef(false)

    const configRef = useRef<Config>({
        vertical,
        responsive,
        itemWidth,
        itemHeight,
        gap,
        bulgeStrength,
        bulgeWidth,
        showActiveBackground,
        bgFadeDuration,
        glide,
    })

    const [cmsItems, setCmsItems] = useState<RibbonItem[]>([])
    const [glVersion, setGlVersion] = useState(0)
    const [texturesReady, setTexturesReady] = useState(false)
    const [cmsExtracted, setCmsExtracted] = useState(false)
    const [glFailed, setGlFailed] = useState(false)

    const isStatic = false
    const isCanvas = false

    useEffect(() => {
        configRef.current = {
            vertical,
            responsive,
            itemWidth,
            itemHeight,
            gap,
            bulgeStrength,
            bulgeWidth,
            showActiveBackground,
            bgFadeDuration,
            glide,
        }
        overlayRef.current = parseRgba(bgOverlayColor)
        needsRenderRef.current = true
    }, [
        vertical,
        responsive,
        itemWidth,
        itemHeight,
        gap,
        bulgeStrength,
        bulgeWidth,
        showActiveBackground,
        bgFadeDuration,
        glide,
        bgOverlayColor,
    ])

    // ---------- CMS extraction ----------

    const extractCmsItems = useCallback(() => {
        const root = hiddenCollectionRef.current
        if (!root) return
        const next: RibbonItem[] = []
        root.querySelectorAll("img").forEach((node) => {
            const src =
                node.getAttribute("srcset") ||
                node.currentSrc ||
                node.getAttribute("src") ||
                ""
            if (src)
                next.push({
                    src,
                    href: node.closest("a")?.getAttribute("href") || null,
                })
        })
        const joined = next.map((e) => `${e.src}|${e.href ?? ""}`).join("||")
        if (joined !== latestJoinedRef.current) {
            latestJoinedRef.current = joined
            startTransition(() => setCmsItems(next))
        }
        if (!cmsExtractedRef.current) {
            cmsExtractedRef.current = true
            startTransition(() => setCmsExtracted(true))
        }
    }, [])

    useLayoutEffect(() => {
        if (typeof window !== "undefined") extractCmsItems()
    }, [extractCmsItems, collection])

    useEffect(() => {
        if (typeof window === "undefined") return
        const disconnect = () => {
            window.clearTimeout(debounceRef.current)
            observerRef.current?.disconnect()
            observerRef.current = null
        }
        const attach = () => {
            disconnect()
            const root = hiddenCollectionRef.current
            if (!root) return
            const obs = new MutationObserver(() => {
                window.clearTimeout(debounceRef.current)
                debounceRef.current = window.setTimeout(extractCmsItems, 200)
            })
            obs.observe(root, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["src", "srcset", "href"],
            })
            observerRef.current = obs
        }
        const onPageShow = () => {
            attach()
            extractCmsItems()
        }
        attach()
        extractCmsItems()
        window.addEventListener("pageshow", onPageShow)
        window.addEventListener("popstate", onPageShow)
        return () => {
            window.removeEventListener("pageshow", onPageShow)
            window.removeEventListener("popstate", onPageShow)
            disconnect()
        }
    }, [extractCmsItems, collection])

    const manualItems = useMemo<RibbonItem[]>(() => {
        const list = images && images.length > 0 ? images : defaultImages
        return list
            .map((img) => typeof img === "string" ? { src: img, href: null } : { src: img?.src || "", href: img?.href || null })
            .filter((item) => Boolean(item.src))
    }, [images])

    const sourceItems = useMemo<RibbonItem[]>(() => {
        if (source === "CMS") {
            if (!isCanvas) return cmsItems
            if (cmsItems.length > 0) return cmsItems
        }
        return manualItems
    }, [cmsItems, isCanvas, manualItems, source])

    const uniqueUrls = useMemo(
        () => Array.from(new Set(sourceItems.map((i) => i.src))),
        [sourceItems]
    )

    const cmsEmpty = source === "CMS" && cmsItems.length === 0
    const shouldShowCanvas =
        source === "Manual" ||
        isCanvas ||
        (cmsExtracted && texturesReady && cmsItems.length > 0)

    useEffect(() => {
        if (source !== "CMS" || isCanvas || typeof window === "undefined")
            return
        if (cmsItems.length > 0) return
        const id = window.setTimeout(() => {
            if (!cmsWarnedRef.current) {
                cmsWarnedRef.current = true
                console.warn(
                    "CurvedRibbonGallery: no CMS images found in the connected Collection"
                )
            }
        }, 3000)
        return () => window.clearTimeout(id)
    }, [cmsItems.length, isCanvas, source])

    // ---------- runtime helpers ----------

    const resetRuntimeState = useCallback(() => {
        const items = renderItemsRef.current
        const L = getLayout(
            configRef.current,
            sizeRef.current.width,
            sizeRef.current.height,
            items.length
        )
        const index = items.length ? activeItemIndex(scrollRef.current, L) : 0
        bgDisplayedRef.current = index
        bgFromRef.current = index
        bgToRef.current = index
        bgProgressRef.current = 1
        bgStartRef.current = 0
        flingVelocityRef.current = 0
        draggingRef.current = false
        lastFrameTimeRef.current = 0
        needsRenderRef.current = true
    }, [])

    useEffect(() => {
        scrollRef.current = 0
        targetScrollRef.current = 0
        flingVelocityRef.current = 0
        resetRuntimeState()
    }, [vertical, resetRuntimeState])

    const getHoveredHref = useCallback(
        (clientX: number, clientY: number): string => {
            if (!enableLinks) return ""
            const rect = containerRef.current?.getBoundingClientRect()
            const items = renderItemsRef.current
            if (!rect || items.length === 0) return ""
            const cfg = configRef.current
            const L = getLayout(cfg, rect.width, rect.height, items.length)
            const lx = clientX - rect.left - rect.width / 2
            const ly = clientY - rect.top - rect.height / 2
            const pAlong = cfg.vertical ? ly : lx
            const pCross = cfg.vertical ? lx : ly
            const half = Math.max(1, L.viewLen / 2)
            const sigma = Math.max(0.0001, cfg.bulgeWidth)
            let hovered = -1
            let hoveredHref = ""
            for (let v = 0; v < L.virtualCount; v++) {
                const item = items[v % L.n]
                if (!item.href) continue
                const along = wrap(
                    (v - L.centerIndex) * L.stride + scrollRef.current,
                    -L.total / 2,
                    L.total / 2
                )
                if (Math.abs(along) > L.viewLen * 0.6 + L.alongSize * 2)
                    continue
                const n = along / half
                const bulge =
                    1 +
                    cfg.bulgeStrength * Math.exp(-(n * n) / (2 * sigma * sigma))
                const drawAlong = along + n * (bulge - 1) * L.alongSize * 0.9
                if (
                    Math.abs(pAlong - drawAlong) <=
                        (L.alongSize * (1 + (bulge - 1) * 0.55)) / 2 &&
                    Math.abs(pCross) <= (L.crossSize * bulge) / 2
                ) {
                    hovered = v
                    hoveredHref = item.href
                    break
                }
            }
            if (hoveredVirtualRef.current !== hovered) {
                hoveredVirtualRef.current = hovered
                needsRenderRef.current = true
            }
            const overlay = hoverOverlayRef.current
            if (overlay) overlay.style.opacity = hovered >= 0 ? "1" : "0"
            return hoveredHref
        },
        [enableLinks, source]
    )

    const updateCursor = useCallback(() => {
        const el = containerRef.current
        if (!el) return
        el.style.cursor = draggingRef.current
            ? "grabbing"
            : hoverHrefRef.current
              ? "pointer"
              : "grab"
    }, [])

    // ---------- WebGL setup + render loop ----------

    useEffect(() => {
        if (isStatic || glFailed || typeof window === "undefined") return
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return
        const gl = (canvas.getContext("webgl", {
            antialias: (window.devicePixelRatio || 1) < 1.5,
            alpha: true,
            premultipliedAlpha: true,
        }) ||
            canvas.getContext(
                "experimental-webgl"
            )) as WebGLRenderingContext | null
        if (!gl || gl.isContextLost()) {
            startTransition(() => setGlFailed(true))
            return
        }
        glRef.current = gl
        let mounted = true
        const isMobileLike =
            window.matchMedia("(pointer: coarse)").matches ||
            window.innerWidth < 810

        const deleteMesh = (m: Mesh) => {
            gl.deleteBuffer(m.positionBuffer)
            gl.deleteBuffer(m.uvBuffer)
            gl.deleteBuffer(m.indexBuffer)
        }
        const destroyResources = () => {
            const r = resourcesRef.current
            if (!r) return
            deleteMesh(r.meshH)
            deleteMesh(r.meshV)
            deleteMesh(r.bgMesh)
            gl.deleteProgram(r.ribbonProgram)
            gl.deleteProgram(r.bgProgram)
            resourcesRef.current = null
        }
        const clearTextures = () => {
            textureCacheRef.current.forEach((t) => gl.deleteTexture(t.texture))
            textureCacheRef.current.clear()
            renderItemsRef.current = []
        }

        const initResources = (): boolean => {
            destroyResources()
            clearTextures()
            const ribbonProgram = createProgram(
                gl,
                RIBBON_VERTEX,
                RIBBON_FRAGMENT
            )
            const bgProgram = createProgram(gl, BG_VERTEX, BG_FRAGMENT)
            const meshH = createMesh(gl, 32, 1)
            const meshV = createMesh(gl, 1, 32)
            const bgMesh = createMesh(gl, 1, 1, 1)
            if (!ribbonProgram || !bgProgram || !meshH || !meshV || !bgMesh)
                return false
            const ru = (n: string) => gl.getUniformLocation(ribbonProgram, n)
            const bu = (n: string) => gl.getUniformLocation(bgProgram, n)
            const r: GLResources = {
                ribbonProgram,
                bgProgram,
                meshH,
                meshV,
                bgMesh,
                rPos: gl.getAttribLocation(ribbonProgram, "aPosition"),
                rUv: gl.getAttribLocation(ribbonProgram, "aUv"),
                bPos: gl.getAttribLocation(bgProgram, "aPosition"),
                bUv: gl.getAttribLocation(bgProgram, "aUv"),
                ru: {
                    uResolution: ru("uResolution"),
                    uItemSize: ru("uItemSize"),
                    uOffset: ru("uOffset"),
                    uVertical: ru("uVertical"),
                    uBulgeStrength: ru("uBulgeStrength"),
                    uBulgeWidth: ru("uBulgeWidth"),
                    uTexture: ru("uTexture"),
                    uTextureSize: ru("uTextureSize"),
                    uBoxSize: ru("uBoxSize"),
                    uTexelSize: ru("uTexelSize"),
                    uHovered: ru("uHovered"),
                },
                bu: {
                    uTextureA: bu("uTextureA"),
                    uTextureB: bu("uTextureB"),
                    uFrameSize: bu("uFrameSize"),
                    uTextureSizeA: bu("uTextureSizeA"),
                    uTextureSizeB: bu("uTextureSizeB"),
                    uMix: bu("uMix"),
                    uOverlay: bu("uOverlay"),
                },
            }
            resourcesRef.current = r
            gl.useProgram(ribbonProgram)
            gl.uniform1i(r.ru.uTexture, 0)
            gl.useProgram(bgProgram)
            gl.uniform1i(r.bu.uTextureA, 0)
            gl.uniform1i(r.bu.uTextureB, 1)
            gl.viewport(0, 0, canvas.width, canvas.height)
            needsRenderRef.current = true
            startTransition(() => setGlVersion((v) => v + 1))
            return true
        }

        const setupSize = () => {
            const rect = container.getBoundingClientRect()
            // Hidden breakpoint (display:none): wait until it becomes visible.
            if (rect.width < 2 || rect.height < 2) return
            const width = Math.floor(rect.width)
            const height = Math.floor(rect.height)
            const dpr = Math.min(
                isMobileLike ? 1.5 : 1.75,
                window.devicePixelRatio || 1
            )
            const cw = Math.max(1, Math.floor(width * dpr))
            const ch = Math.max(1, Math.floor(height * dpr))
            sizeRef.current.width = width
            sizeRef.current.height = height
            textureCapRef.current =
                !isMobileLike && Math.max(width, height) * dpr > 1100
                    ? 2048
                    : 1024
            if (canvas.width !== cw || canvas.height !== ch) {
                canvas.width = cw
                canvas.height = ch
            }
            gl.viewport(0, 0, cw, ch)
            needsRenderRef.current = true
        }

        const bindMesh = (m: Mesh, pos: number, uv: number) => {
            gl.bindBuffer(gl.ARRAY_BUFFER, m.positionBuffer)
            gl.enableVertexAttribArray(pos)
            gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
            gl.bindBuffer(gl.ARRAY_BUFFER, m.uvBuffer)
            gl.enableVertexAttribArray(uv)
            gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 0, 0)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.indexBuffer)
        }

        const draw = (time: number) => {
            if (!mounted || !rafActiveRef.current) return
            rafRef.current = window.requestAnimationFrame(draw)
            const r = resourcesRef.current
            if (!r) return
            const cfg = configRef.current

            // ----- scroll physics (frame-rate independent) -----
            const lastFrame = lastFrameTimeRef.current || time
            const dt = Math.min(0.05, Math.max(0, (time - lastFrame) / 1000))
            lastFrameTimeRef.current = time
            if (draggingRef.current) {
                scrollRef.current = targetScrollRef.current
            } else {
                if (Math.abs(flingVelocityRef.current) > 5) {
                    targetScrollRef.current += flingVelocityRef.current * dt
                    flingVelocityRef.current *= Math.exp(-dt * cfg.glide)
                } else {
                    flingVelocityRef.current = 0
                }
                const diff = targetScrollRef.current - scrollRef.current
                if (Math.abs(diff) < 0.05)
                    scrollRef.current = targetScrollRef.current
                else scrollRef.current += diff * (1 - Math.exp(-dt * 16))
            }

            const scrolled = scrollRef.current !== lastDrawnScrollRef.current
            const fading = bgProgressRef.current < 1
            if (!scrolled && !fading && !needsRenderRef.current) return
            needsRenderRef.current = false
            lastDrawnScrollRef.current = scrollRef.current

            const items = renderItemsRef.current
            const width = sizeRef.current.width
            const height = sizeRef.current.height
            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            if (items.length === 0) return

            const L = getLayout(cfg, width, height, items.length)
            const count = items.length
            const safe = (i: number) =>
                ((Math.round(i) % count) + count) % count

            // ----- active background (static, fade only) -----
            if (cfg.showActiveBackground) {
                const target = activeItemIndex(scrollRef.current, L)
                if (bgProgressRef.current >= 1) {
                    if (bgDisplayedRef.current !== target) {
                        bgFromRef.current = bgDisplayedRef.current
                        bgToRef.current = target
                        bgStartRef.current = time
                        bgProgressRef.current = 0
                    }
                } else if (target !== bgToRef.current) {
                    const dominant =
                        bgProgressRef.current > 0.5
                            ? bgToRef.current
                            : bgFromRef.current
                    bgDisplayedRef.current = dominant
                    bgFromRef.current = dominant
                    bgToRef.current = target
                    bgStartRef.current = time
                    bgProgressRef.current = 0
                }
                if (bgProgressRef.current < 1) {
                    const p = Math.min(
                        1,
                        (time - bgStartRef.current) /
                            Math.max(50, cfg.bgFadeDuration)
                    )
                    bgProgressRef.current = p
                    if (p >= 1) bgDisplayedRef.current = bgToRef.current
                }
                const p = bgProgressRef.current
                const settled = p >= 1
                const a =
                    items[
                        safe(
                            settled ? bgDisplayedRef.current : bgFromRef.current
                        )
                    ].tex
                const b =
                    items[
                        safe(settled ? bgDisplayedRef.current : bgToRef.current)
                    ].tex
                gl.useProgram(r.bgProgram)
                bindMesh(r.bgMesh, r.bPos, r.bUv)
                gl.activeTexture(gl.TEXTURE0)
                gl.bindTexture(gl.TEXTURE_2D, a.texture)
                gl.activeTexture(gl.TEXTURE1)
                gl.bindTexture(gl.TEXTURE_2D, b.texture)
                gl.uniform2f(r.bu.uFrameSize, width, height)
                gl.uniform2f(r.bu.uTextureSizeA, a.width, a.height)
                gl.uniform2f(r.bu.uTextureSizeB, b.width, b.height)
                gl.uniform1f(r.bu.uMix, settled ? 0 : p * p * (3 - 2 * p))
                const o = overlayRef.current
                gl.uniform4f(r.bu.uOverlay, o[0], o[1], o[2], o[3])
                gl.drawElements(
                    gl.TRIANGLES,
                    r.bgMesh.indexCount,
                    gl.UNSIGNED_SHORT,
                    0
                )
            }

            // ----- ribbon -----
            const mesh = cfg.vertical ? r.meshV : r.meshH
            gl.useProgram(r.ribbonProgram)
            bindMesh(mesh, r.rPos, r.rUv)
            gl.activeTexture(gl.TEXTURE0)
            gl.uniform2f(r.ru.uResolution, width, height)
            gl.uniform2f(r.ru.uItemSize, L.iw, L.ih)
            gl.uniform2f(r.ru.uBoxSize, L.iw, L.ih)
            gl.uniform1f(r.ru.uVertical, cfg.vertical ? 1 : 0)
            gl.uniform1f(r.ru.uBulgeStrength, cfg.bulgeStrength)
            gl.uniform1f(r.ru.uBulgeWidth, cfg.bulgeWidth)
            let bound: WebGLTexture | null = null
            const cull = L.viewLen * 0.6 + L.alongSize * 2
            const overlay = hoverOverlayRef.current
            if (overlay && hoveredVirtualRef.current >= 0) {
                const v = hoveredVirtualRef.current
                const along = wrap(
                    (v - L.centerIndex) * L.stride + scrollRef.current,
                    -L.total / 2, L.total / 2
                )
                const n = along / Math.max(1, L.viewLen / 2)
                const bulge = 1 + cfg.bulgeStrength * Math.exp(
                    -(n * n) / (2 * Math.max(0.0001, cfg.bulgeWidth) ** 2)
                )
                const center = along + n * (bulge - 1) * L.alongSize * 0.9
                overlay.style.left = `${width / 2 + (cfg.vertical ? 0 : center)}px`
                overlay.style.top = `${height / 2 + (cfg.vertical ? center : 0)}px`
            }
            for (let v = 0; v < L.virtualCount; v++) {
                const along = wrap(
                    (v - L.centerIndex) * L.stride + scrollRef.current,
                    -L.total / 2,
                    L.total / 2
                )
                if (Math.abs(along) > cull) continue
                const tex = items[v % L.n].tex
                if (tex.texture !== bound) {
                    gl.bindTexture(gl.TEXTURE_2D, tex.texture)
                    gl.uniform2f(r.ru.uTextureSize, tex.width, tex.height)
                    gl.uniform2f(r.ru.uTexelSize, 1 / tex.width, 1 / tex.height)
                    bound = tex.texture
                }
                gl.uniform1f(r.ru.uOffset, along)
                gl.uniform1f(r.ru.uHovered, v === hoveredVirtualRef.current ? 1 : 0)
                gl.drawElements(
                    gl.TRIANGLES,
                    mesh.indexCount,
                    gl.UNSIGNED_SHORT,
                    0
                )
            }
        }

        const updateRafState = () => {
            const shouldRun = isVisibleRef.current && isInViewRef.current
            if (shouldRun && !rafActiveRef.current) {
                rafActiveRef.current = true
                needsRenderRef.current = true
                lastFrameTimeRef.current = 0
                rafRef.current = window.requestAnimationFrame(draw)
            } else if (!shouldRun && rafActiveRef.current) {
                rafActiveRef.current = false
                window.cancelAnimationFrame(rafRef.current)
            }
        }

        const onVisibility = () => {
            isVisibleRef.current = !document.hidden
            updateRafState()
        }
        const onFocus = () => {
            isVisibleRef.current = !document.hidden
            updateRafState()
        }
        const onPopState = () => {
            resetRuntimeState()
            isVisibleRef.current = !document.hidden
            isInViewRef.current = true
            updateRafState()
        }
        const onPageShow = (event: Event) => {
            resetRuntimeState()
            setupSize()
            isVisibleRef.current = !document.hidden
            isInViewRef.current = true
            if (
                (event as PageTransitionEvent).persisted &&
                !resourcesRef.current
            ) {
                if (!initResources()) startTransition(() => setGlFailed(true))
            }
            updateRafState()
        }
        const onContextLost = (event: Event) => {
            event.preventDefault()
            rafActiveRef.current = false
            window.cancelAnimationFrame(rafRef.current)
            resourcesRef.current = null
            textureCacheRef.current.clear()
            renderItemsRef.current = []
        }
        const onContextRestored = () => {
            setupSize()
            if (!initResources()) {
                startTransition(() => setGlFailed(true))
                return
            }
            updateRafState()
        }

        const io = new IntersectionObserver((entries) => {
            isInViewRef.current = entries[0]?.isIntersecting ?? true
            if (isInViewRef.current) setupSize()
            updateRafState()
        })
        io.observe(container)
        const ro = new ResizeObserver(() => setupSize())
        ro.observe(container)
        canvas.addEventListener("webglcontextlost", onContextLost)
        canvas.addEventListener("webglcontextrestored", onContextRestored)
        document.addEventListener("visibilitychange", onVisibility)
        window.addEventListener("focus", onFocus)
        window.addEventListener("popstate", onPopState)
        window.addEventListener("pageshow", onPageShow)

        setupSize()
        if (!initResources()) {
            // WebGL couldn't build its programs on this device: use the static fallback.
            startTransition(() => setGlFailed(true))
        }
        resetRuntimeState()
        isVisibleRef.current = !document.hidden
        isInViewRef.current = true
        updateRafState()

        return () => {
            mounted = false
            rafActiveRef.current = false
            window.cancelAnimationFrame(rafRef.current)
            io.disconnect()
            ro.disconnect()
            canvas.removeEventListener("webglcontextlost", onContextLost)
            canvas.removeEventListener(
                "webglcontextrestored",
                onContextRestored
            )
            document.removeEventListener("visibilitychange", onVisibility)
            window.removeEventListener("focus", onFocus)
            window.removeEventListener("popstate", onPopState)
            window.removeEventListener("pageshow", onPageShow)
            destroyResources()
            clearTextures()
            glRef.current = null
            // Note: the context is NOT force-lost here, because Framer can reuse
            // this canvas when switching breakpoints; a lost context would stay blank.
        }
    }, [isStatic, glFailed, resetRuntimeState])

    // ---------- textures: each unique image loaded once, cached ----------

    useEffect(() => {
        if (isStatic || glFailed || typeof window === "undefined") return
        if (source === "CMS" && !isCanvas && !cmsExtracted) return
        const gl = glRef.current
        if (!gl || !resourcesRef.current) return
        const cache = textureCacheRef.current
        const cap = textureCapRef.current
        const items = sourceItems
        const urls = uniqueUrls
        const generation = ++loadGenerationRef.current

        Promise.all(
            urls.map(async (url) => {
                const cached = cache.get(url)
                if (cached) return cached
                const loaded = await loadTexture(
                    gl,
                    sizedImageUrl(url, cap),
                    cap
                )
                if (loaded && glRef.current === gl) cache.set(url, loaded)
                return loaded
            })
        ).then(() => {
            if (
                loadGenerationRef.current !== generation ||
                glRef.current !== gl
            )
                return
            const keep = new Set(urls)
            cache.forEach((tex, url) => {
                if (!keep.has(url)) {
                    gl.deleteTexture(tex.texture)
                    cache.delete(url)
                }
            })
            const next: RenderItem[] = []
            for (const item of items) {
                const tex = cache.get(item.src)
                if (tex) next.push({ href: item.href, tex })
            }
            renderItemsRef.current = next
            resetRuntimeState()
            if (!texturesReadyRef.current && next.length > 0) {
                texturesReadyRef.current = true
                startTransition(() => setTexturesReady(true))
            }
        })
    }, [
        cmsExtracted,
        glVersion,
        glFailed,
        isCanvas,
        isStatic,
        resetRuntimeState,
        source,
        sourceItems,
        uniqueUrls,
    ])

    // ---------- wheel / trackpad ----------

    useEffect(() => {
        if (typeof window === "undefined") return
        const root = containerRef.current
        if (!root) return
        const onWheel = (event: WheelEvent) => {
            const scale =
                event.deltaMode === 1
                    ? 16
                    : event.deltaMode === 2
                      ? window.innerHeight
                      : 1
            const dx = event.deltaX * scale
            const dy = event.deltaY * scale
            let delta = 0
            if (captureScroll) {
                delta = Math.abs(dx) > Math.abs(dy) ? dx : dy
            } else if (!vertical && Math.abs(dx) > Math.abs(dy)) {
                delta = dx
            } else {
                return // let the page scroll
            }
            event.preventDefault()
            flingVelocityRef.current = 0
            targetScrollRef.current -= delta
        }
        root.addEventListener("wheel", onWheel, { passive: false })
        return () => root.removeEventListener("wheel", onWheel)
    }, [captureScroll, vertical])

    // ---------- pointer / touch drag ----------

    const onPointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.pointerType === "mouse" && event.button !== 0) return
            hoveredVirtualRef.current = -1
            if (hoverOverlayRef.current) hoverOverlayRef.current.style.opacity = "0"
            needsRenderRef.current = true
            pointerDownRef.current = {
                x: event.clientX,
                y: event.clientY,
                moved: false,
                href: getHoveredHref(event.clientX, event.clientY),
            }
            try {
                event.currentTarget.setPointerCapture(event.pointerId)
            } catch {}
            draggingRef.current = true
            targetScrollRef.current = scrollRef.current
            flingVelocityRef.current = 0
            pointerXRef.current = event.clientX
            pointerYRef.current = event.clientY
            lastMoveTimeRef.current = performance.now()
            updateCursor()
        },
        [getHoveredHref, updateCursor]
    )

    const onPointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (!draggingRef.current) {
                if (
                    event.pointerType === "mouse" &&
                    enableLinks &&
                    (source === "CMS" || source === "Manual")
                ) {
                    const href = getHoveredHref(event.clientX, event.clientY)
                    if (href !== hoverHrefRef.current) {
                        hoverHrefRef.current = href
                        updateCursor()
                    }
                }
                return
            }
            const dx = event.clientX - pointerXRef.current
            const dy = event.clientY - pointerYRef.current
            pointerXRef.current = event.clientX
            pointerYRef.current = event.clientY
            if (
                Math.hypot(
                    event.clientX - pointerDownRef.current.x,
                    event.clientY - pointerDownRef.current.y
                ) > 5
            )
                pointerDownRef.current.moved = true

            const move = vertical ? dy : dx
            targetScrollRef.current += move

            const now = performance.now()
            const elapsed = Math.max(1, now - lastMoveTimeRef.current)
            lastMoveTimeRef.current = now
            flingVelocityRef.current =
                flingVelocityRef.current * 0.3 + (move / elapsed) * 1000 * 0.7
        },
        [enableLinks, getHoveredHref, source, updateCursor, vertical]
    )

    const endDrag = useCallback(
        (event: PointerEvent<HTMLDivElement>, allowTap: boolean) => {
            if (!draggingRef.current) return
            try {
                event.currentTarget.releasePointerCapture(event.pointerId)
            } catch {}
            const wasTap = !pointerDownRef.current.moved
            if (
                allowTap &&
                wasTap &&
                pointerDownRef.current.href &&
                enableLinks &&
                (source === "CMS" || source === "Manual")
            ) {
                window.location.assign(pointerDownRef.current.href)
            }
            if (wasTap || performance.now() - lastMoveTimeRef.current > 80) {
                flingVelocityRef.current = 0
            } else {
                flingVelocityRef.current = clamp(
                    flingVelocityRef.current,
                    -6000,
                    6000
                )
            }
            draggingRef.current = false
            needsRenderRef.current = true
            updateCursor()
        },
        [enableLinks, source, updateCursor]
    )

    const onPointerUp = useCallback(
        (e: PointerEvent<HTMLDivElement>) => endDrag(e, true),
        [endDrag]
    )
    const onPointerCancel = useCallback(
        (e: PointerEvent<HTMLDivElement>) => endDrag(e, false),
        [endDrag]
    )
    const onPointerLeave = useCallback(() => {
        if (draggingRef.current) return
        hoverHrefRef.current = ""
        hoveredVirtualRef.current = -1
        if (hoverOverlayRef.current) hoverOverlayRef.current.style.opacity = "0"
        needsRenderRef.current = true
        updateCursor()
    }, [updateCursor])

    // ---------- static preview (editor canvas + fallback if WebGL fails) ----------

    const staticPreview = useMemo(() => {
        const list = (
            source === "CMS" && isCanvas && cmsItems.length === 0
                ? manualItems
                : sourceItems
        ).slice(0, 12)
        const alongSize = vertical ? itemHeight : itemWidth
        const stride = alongSize + gap
        const center = Math.floor(list.length / 2)
        return (
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                {list.map((item, i) => {
                    const along = (i - center) * stride
                    const n = along / 500
                    const bulge =
                        1 +
                        bulgeStrength *
                            Math.exp(-(n * n) / (2 * bulgeWidth * bulgeWidth))
                    const offset = along + n * (bulge - 1) * alongSize * 0.9
                    const w = vertical
                        ? itemWidth * bulge
                        : itemWidth * (1 + (bulge - 1) * 0.45)
                    const h = vertical
                        ? itemHeight * (1 + (bulge - 1) * 0.45)
                        : itemHeight * bulge
                    return (
                        <img
                            key={`${item.src}-${i}`}
                            src={sizedImageUrl(item.src, 1024)}
                            alt=""
                            draggable={false}
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                width: w,
                                height: h,
                                objectFit: "cover",
                                transform: `translate(-50%, -50%) ${vertical ? "translateY" : "translateX"}(${offset}px)`,
                            }}
                        />
                    )
                })}
            </div>
        )
    }, [
        source,
        isCanvas,
        cmsItems.length,
        manualItems,
        sourceItems,
        vertical,
        itemWidth,
        itemHeight,
        gap,
        bulgeStrength,
        bulgeWidth,
    ])

    const touchAction = captureScroll ? "none" : vertical ? "pan-x" : "pan-y"
    const useStatic = isStatic || glFailed
    // Prevents the component collapsing to 0 height when a breakpoint uses Fit.
    const minHeight = vertical
        ? 480
        : Math.round(itemHeight * (1 + bulgeStrength) + 40)

    return (
        <div
            ref={containerRef}
            role="region"
            aria-label="Curved ribbon image gallery"
            onPointerDown={useStatic ? undefined : onPointerDown}
            onPointerMove={useStatic ? undefined : onPointerMove}
            onPointerUp={useStatic ? undefined : onPointerUp}
            onPointerCancel={useStatic ? undefined : onPointerCancel}
            onPointerLeave={useStatic ? undefined : onPointerLeave}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight,
                overflow: "hidden",
                backgroundColor: "transparent",
                touchAction: useStatic ? "auto" : touchAction,
                cursor: useStatic ? "default" : "grab",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            <div
                ref={hiddenCollectionRef}
                aria-hidden
                style={{
                    position: "absolute",
                    top: 0,
                    left: "-200vw",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    visibility: "hidden",
                    pointerEvents: "none",
                }}
            >
                {collection}
            </div>
            {useStatic ? (
                <>
                    {staticPreview}
                    {cmsEmpty && isCanvas ? (
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "#000",
                                background: "rgba(255,255,255,0.85)",
                                padding: "8px 10px",
                                borderRadius: 6,
                                fontSize: 12,
                                whiteSpace: "nowrap",
                            }}
                        >
                            Connect a Collection List to the Collection slot.
                        </div>
                    ) : null}
                </>
            ) : (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        display: "block",
                        opacity: shouldShowCanvas ? 1 : 0,
                        transition: "opacity 400ms ease",
                        touchAction,
                    }}
                />
            )}
            {!useStatic && enableLinks && (
                <div
                    ref={hoverOverlayRef}
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                        opacity: 0,
                        transition: "opacity 200ms ease",
                        zIndex: 2,
                        whiteSpace: "nowrap",
                        padding: 0,
                        background: "transparent",
                        color: "white",
                        fontSize: 15,
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                    }}
                >
                    View Project Detail
                </div>
            )}
        </div>
    )
}

