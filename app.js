function main() {
    const canvas = document.querySelector('#c')

    // CAMERA
    const fov = 75 // extent of the scene seen on the display
    const aspect = canvas.clientWidth / canvas.clientHeight //ratio (how many times is the width bigger then height)
    const near = 0.1 // object disappears when reaches this size
    const far = 2000

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 1

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ canvas })


    new THREE.OrbitControls(camera, canvas)

    // SCENE
    const scene = new THREE.Scene()
    const loader = new THREE.TextureLoader()
    const texture = loader.load()
    loader.load(
        // load any image
        '',
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
            rt.fromEquirectangularTexture(renderer, texture)
            scene.background = texture
        }
    )

    function render() {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height, false) // size responsive to screen / browser windonw
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
