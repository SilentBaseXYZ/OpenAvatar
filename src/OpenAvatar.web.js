const SilentBaseAvatar = {
    randseed: new Array(4),

    seedrand(seed) {
        for (let i = 0; i < this.randseed.length; i++) {
            this.randseed[i] = 0;
        }
        for (let i = 0; i < seed.length; i++) {
            this.randseed[i % 4] = (this.randseed[i % 4] << 5) - this.randseed[i % 4] + seed.charCodeAt(i);
        }
    },

    rand() {
        const t = this.randseed[0] ^ (this.randseed[0] << 11);
        this.randseed[0] = this.randseed[1];
        this.randseed[1] = this.randseed[2];
        this.randseed[2] = this.randseed[3];
        this.randseed[3] ^= this.randseed[3] >> 19 ^ t ^ (t >> 8);
        return (this.randseed[3] >>> 0) / (1 << 31 >>> 0);
    },

    createImageData(size) {
        const data = [];
        const half = Math.ceil(size / 2);
        const total = size * size;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < half; j++) {
                row[j] = Math.floor(2 * this.rand());
            }
            const reversed = row.slice(0, half).reverse();
            row = row.concat(reversed);
            data.push(...row);
        }
        return data;
    },

    createIcon(options) {
        const size = options.size || 8;
        const canvas_name = options.canvas_name || 'avatar';
        this.seedrand(options.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16));

        const colors = {
            color: '#41F182',
            bgcolor: '#181B25'
        };

        const imageData = this.createImageData(size);
        const canvas = document.getElementById(canvas_name);
        canvas.style.borderRadius  = '50%';
        canvas.style.border = '4px solid #333';
        const context = canvas.getContext('2d');
        const pixelSize = canvas.width / size;

        for (let i = 0; i < imageData.length; i++) {
            const row = Math.floor(i / size);
            const col = i % size;
            const color = imageData[i] === 0 ? colors.bgcolor : colors.color;

            context.fillStyle = color;
            context.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
        }
    }
};

