export default
{
        filters :
            [
                {
                    "filter": "none",
                },
                {
                    "filter": "feGaussianBlur",
                    "in": ["SourceGraphic", "SourceAlpha", "BackgroundImage", "BackgroundAlpha", "FillPaint", "StrokePaint"],
                    "stdDeviation": 50,
                    "edgeMode": ["duplicate", "wrap", "none"]
                },
                {
                    "filter": "feMorphology",
                    "radius": 2,
                    "operator": ["erode", "dilate"]
                },
                {
                    "filter": "feColorMatrix",
                    "in": ["SourceGraphic", "SourceAlpha", "BackgroundImage", "BackgroundAlpha", "FillPaint", "StrokePaint"],
                    "type": ["saturate ", "hueRotate ", "luminanceToAlpha"],
                }

            ]
}