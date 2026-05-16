window.Fractal = null;
window.Module = {
    onRuntimeInitialized: function () {
        window.Fractal = {
            init_display: Module.cwrap("init_display", null, ["number", "number"]),
            resize_display: Module.cwrap("resize_display", null, ["number", "number"]),
            set_max_it: Module.cwrap("set_max_it", "number", ["number"]),
            set_max_it: Module.cwrap("set_max_it", "number", ["number"]),
            set_imag: Module.cwrap("set_imag", null, ["number"]),
            set_real: Module.cwrap("set_real", null, ["number"]),
            set_color1: Module.cwrap("set_color1", null, [
                "number", "number", "number"
            ]),
            set_color2: Module.cwrap("set_color2", null, [
                "number", "number", "number"
            ]),
            get_pixel_buffer: Module.cwrap("get_pixel_buffer", "number", []),
            get_width: Module.cwrap("get_width", "number", []),
            get_height: Module.cwrap("get_height", "number", []),
            get_pixel_array: function () {
                const width = this.get_width();
                const height = this.get_height();
                const ptr = this.get_pixel_buffer();

                return new Uint8ClampedArray(
                    Module.HEAPU8.buffer,
                    ptr,
                    width * height * 4
                );
            },
            zoom: Module.cwrap("zoom", null, ["number"]),
            move: Module.cwrap("move", null, ["number", "number"]),
            render: Module.cwrap("render", null, []),
        }

        window.dispatchEvent(
            new CustomEvent("fractal_loaded")
        )
    }
};