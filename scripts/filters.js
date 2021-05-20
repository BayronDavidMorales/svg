export default
{
        filters :
            [
                {
                    "filter": "none",
                },
                {
                    "filter": "feBlend",
                    "in": ["SourceGraphic", "SourceAlpha", "BackgroundImage", "BackgroundAlpha", "FillPaint", "StrokePaint"],
                    "in2": ["SourceGraphic", "SourceAlpha", "BackgroundImage", "BackgroundAlpha", "FillPaint", "StrokePaint"],
                    "mode": ["normal", "multiply", "screen", "darken", "lighten"]
                },
                {
                    "filter": "feGaussianBlur",
                    "in": ["SourceGraphic", "SourceAlpha", "BackgroundImage", "BackgroundAlpha", "FillPaint", "StrokePaint"],
                    "stdDeviation": 50,
                    "edgeMode": ["duplicate", "wrap", "none"]
                },
                {
                    "filter": "feMorphology",
                    "radius": 5,
                    "operator": ["erode", "dilate"]
                },
                {
                    "filter": "feColorMatrix",
                    "in": ["SourceGraphic", "SourceAlpha", "BackgroundImage", "BackgroundAlpha", "FillPaint", "StrokePaint"],
                    "type": ["saturate", "hueRotate", "luminanceToAlpha"],
                    "values": 10
                },{
                    "filter": "feComponentTransfer",
                    "option": ["Not implemented"]
                },{
                    "filter": "feComposite",
                    "option": ["Not implemented"]
                },
                {
                    "filter": "feConvolveMatrix",
                    "option": ["Not implemented"]
                    // "in": ["SourceGraphic", "SourceAlpha", "BackgroundImage", "BackgroundAlpha", "FillPaint", "StrokePaint"],
                    // "order": 10,
                    // "kernelMatrix": 10,
                    // "divisor": 10,
                    // "bias": 10,
                    // "targetX": 5,
                    // "targetY": 9,
                    // "preserveAlpha": ["true", "false"],
                    // "edgeMode": ["duplicate", "wrap", "none"],
                },

            ]
}