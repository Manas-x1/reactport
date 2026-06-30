import React from 'react';

export default function Hero() {
    return (
        <section className="relative h-screen w-full bg-ink flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    alt="Manas Portrait" 
                    className="w-full h-full object-cover object-center opacity-40 hero-mask"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrY_pt-x3hS2r92uhrk4osKXSnokcUtuIi0rLRhIHoXWmX26KwSeGkFr29wVgUWkQqu_e1E-X3Syj6pxOeoc-HQDDgZWqF_O4NUw0D5Zy8Svigndoe7hxlfUMr0uTEKj--Xw9sFCq_koFpXGfxo_26hBkppB9jHO79Nbo8rkPvMCC8y93BAgpa8P6YNF7usFp_f_6qQ3h6WdSiqJuo_scZESwLIk7QJu0SCSm3JzQsbLa3lT_c7rGfv3yo3RrUx5s4SmCV0SnlB6bmn34"
                />
            </div>
            <div className="relative z-10 text-center select-none">
                <h1 className="font-hero text-hero-mobile md:text-hero text-paper uppercase leading-tight select-none">
                    MANAS<br />
                    <div className="w-full overflow-hidden bg-white/5 backdrop-blur-md border-y border-white/10 my-micro py-1 select-none leading-none">
                        <div className="flex whitespace-nowrap animate-marquee gap-element-md items-center">
                            <span className="font-body-lg text-[24px] md:text-[32px] uppercase tracking-widest text-paper opacity-80">
                                3D artist • Ai content Creator • Graphic Designer • Video Editor • UI/UX designer • 3D artist • Ai content Creator • Graphic Designer • Video Editor • UI/UX designer • 
                            </span>
                            <span className="font-body-lg text-[24px] md:text-[32px] uppercase tracking-widest text-paper opacity-80">
                                3D artist • Ai content Creator • Graphic Designer • Video Editor • UI/UX designer • 3D artist • Ai content Creator • Graphic Designer • Video Editor • UI/UX designer • 
                            </span>
                        </div>
                    </div>
                    UPADHYAY
                </h1>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-micro">
                <span className="font-ui-nav text-ui-nav text-ash uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-px h-12 bg-ash animate-pulse"></div>
            </div>
        </section>
    );
}
