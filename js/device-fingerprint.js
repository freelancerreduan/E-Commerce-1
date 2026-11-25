(function () {
    function hash(str) {
        var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ c, 2654435761);
            h2 = Math.imul(h2 ^ c, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return (('00000000' + (h1 >>> 0).toString(16)).slice(-8)) +
               (('00000000' + (h2 >>> 0).toString(16)).slice(-8));
    }

    function canvas() {
        try {
            var c = document.createElement('canvas'), x = c.getContext('2d');
            x.font = '18px Arial'; x.fillStyle = '#f00';
            x.fillText('device-fp', 2, 20);
            x.fillStyle = 'rgba(0,255,0,0.5)';
            x.fillRect(0, 0, 10, 10);
            return c.toDataURL().slice(-40);
        } catch(e) { return 'c0'; }
    }

    function webgl() {
        try {
            var c = document.createElement('canvas');
            var g = c.getContext('webgl') || c.getContext('experimental-webgl');
            var e = g && g.getExtension('WEBGL_debug_renderer_info');
            return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'g0';
        } catch(e) { return 'g0'; }
    }

    function generate() {
        var s = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            navigator.hardwareConcurrency || 0,
            navigator.deviceMemory || 0,
            new Date().getTimezoneOffset(),
            navigator.maxTouchPoints || 0,
            canvas(),
            webgl(),
        ].join('|');

        // 4x hash of different slices → 64 hex chars
        return hash(s) + hash(s.split('').reverse().join('')) +
               hash(s.slice(0, s.length >> 1)) + hash(s.slice(s.length >> 1));
    }

    function run() {
        var fp = generate();
        window._deviceFingerprint = fp;

        // Set in all order forms
        var fields = document.querySelectorAll('#dfp_field, input[name="device_fingerprint"]');
        fields.forEach(function(el) { el.value = fp; });

        // Also inject if form exists but field missing
        document.querySelectorAll('form#orderForm').forEach(function(form) {
            if (!form.querySelector('input[name="device_fingerprint"]')) {
                var inp = document.createElement('input');
                inp.type = 'hidden'; inp.name = 'device_fingerprint'; inp.value = fp;
                form.appendChild(inp);
            }
        });
    }

    // Run immediately — scripts are at bottom of body so DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
