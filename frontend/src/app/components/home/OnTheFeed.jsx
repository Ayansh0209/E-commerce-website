// 'use client';

// import { useEffect, useRef } from "react";

// export default function OnTheFeed() {
//   const feed = [
//     { id: 1, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
//     { id: 2, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
//     { id: 3, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
//     { id: 4, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
//     { id: 5, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
//   ];

//   const containerRef = useRef(null);

//   // Auto-play only visible video
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const videos = container.querySelectorAll("video");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
//             video.play();
//           } else {
//             video.pause();
//             video.currentTime = 0;
//           }
//         });
//       },
//       { threshold: [0.6] }
//     );

//     videos.forEach((v) => observer.observe(v));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="py-16 bg-white">
//       {/* Title */}
//       <div className="text-center mb-10">
//         <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
//           ON THE FEED
//         </h2>
//         <p className="text-gray-600 mt-2">
//           See what our community is wearing
//         </p>
//       </div>

//       {/* Horizontal Feed */}
//       <div
//         ref={containerRef}
//         className="
//           flex gap-6 px-6
//           overflow-x-auto
//           snap-x snap-mandatory
//           scrollbar-hide
//         "
//       >
//         {feed.map((item) => (
//           <div
//             key={item.id}
//             className="
//               snap-center
//               flex-shrink-0
//               w-[260px] sm:w-[300px] md:w-[340px]
//               aspect-[3/4]
//               rounded-3xl
//               overflow-hidden
//               bg-black
//               shadow-xl
//               transition-transform
//               duration-300
//             "
//           >
//             <video
//               src={item.src}
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       <p className="text-center text-sm text-gray-500 mt-6">
//         Swipe or scroll horizontally
//       </p>
//     </section>
//   );
// }

// 'use client';

// import { useEffect, useRef, useState } from "react";

// export default function OnTheFeed() {
//   const feed = [
//     { id: 1, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
//     { id: 2, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
//     { id: 3, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
//     { id: 4, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
//     { id: 5, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
//   ];

//   const [active, setActive] = useState(2);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     let lastScroll = 0;
//     const onWheel = (e) => {
//       const now = Date.now();
//       if (now - lastScroll < 500) return;
//       lastScroll = now;

//       if (e.deltaY > 0) {
//         setActive((p) => Math.min(p + 1, feed.length - 1));
//       } else {
//         setActive((p) => Math.max(p - 1, 0));
//       }
//     };

//     el.addEventListener("wheel", onWheel);
//     return () => el.removeEventListener("wheel", onWheel);
//   }, []);

//   return (
//     <section className="py-20 bg-[#fafafa] overflow-hidden">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold">ON THE FEED</h2>
//         <p className="text-gray-600 mt-2">See what our community is wearing</p>
//       </div>

//       <div
//         ref={containerRef}
//         className="flex items-center justify-center gap-8 px-10"
//       >
//         {feed.map((item, i) => {
//           const isActive = i === active;
//           const distance = Math.abs(i - active);

//           return (
//             <div
//               key={item.id}
//               className="transition-all duration-500 ease-out"
//               style={{
//                 transform: `
//                   scale(${isActive ? 1.12 : 0.9})
//                   translateY(${distance * 14}px)
//                 `,
//                 opacity: isActive ? 1 : 0.6,
//               }}
//             >
//               <div className="w-[260px] md:w-[320px] aspect-[3/4] rounded-[28px] overflow-hidden bg-black shadow-2xl">
//                 <video
//                   src={item.src}
//                   muted
//                   loop
//                   playsInline
//                   autoPlay={isActive}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <p className="text-center text-sm text-gray-500 mt-6">
//         Scroll to explore
//       </p>
//     </section>
//   );
// }

// 'use client';

// import { useEffect, useRef } from "react";

// export default function OnTheFeed() {
//   const feed = [
//     { id: 1, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
//     { id: 2, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
//     { id: 3, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
//     { id: 4, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
//     { id: 5, src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
//   ];

//   const containerRef = useRef(null);

//   useEffect(() => {
//     const videos = containerRef.current.querySelectorAll("video");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) e.target.play();
//           else {
//             e.target.pause();
//             e.target.currentTime = 0;
//           }
//         });
//       },
//       { threshold: 0.7 }
//     );

//     videos.forEach((v) => observer.observe(v));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="py-20 bg-white">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold">ON THE FEED</h2>
//         <p className="text-gray-600 mt-2">See what our community is wearing</p>
//       </div>

//       <div
//         ref={containerRef}
//         className="flex gap-6 px-8 overflow-x-auto scrollbar-hide"
//       >
//         {feed.map((item, i) => (
//           <div
//             key={item.id}
//             className="flex-shrink-0 transition-transform duration-500"
//             style={{
//               transform: `translateY(${i % 2 === 0 ? "0px" : "26px"})`,
//             }}
//           >
//             <div className="w-[260px] md:w-[300px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-xl bg-black">
//               <video
//                 src={item.src}
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// 'use client';

// import { useEffect, useRef, useState } from "react";

// export default function OnTheFeed() {
//   // 🔁 duplicated to 10 items
//   const baseFeed = [
//     "ForBiggerJoyrides",
//     "ForBiggerEscapes",
//     "ForBiggerFun",
//     "ForBiggerBlazes",
//     "BigBuckBunny",
//      "ForBiggerJoyrides",
//     "ForBiggerEscapes",
//     "ForBiggerFun",
//     "ForBiggerBlazes",
//     "BigBuckBunny",
//   ];

//   const feed = [...baseFeed, ...baseFeed].map((v, i) => ({
//     id: i,
//     src: `https://storage.googleapis.com/gtv-videos-bucket/sample/${v}.mp4`,
//   }));

//   const containerRef = useRef(null);
//   const [active, setActive] = useState(4);

//   // 🎯 controlled scroll (not sensitive)
//  useEffect(() => {
//   const el = containerRef.current;
//   if (!el) return;

//   const CARD_WIDTH = 320 + 32; // card width + gap (md size)

//   const onScroll = () => {
//     const index = Math.round(el.scrollLeft / CARD_WIDTH);
//     setActive(Math.min(Math.max(index, 0), feed.length - 1));
//   };

//   el.addEventListener("scroll", onScroll, { passive: true });
//   return () => el.removeEventListener("scroll", onScroll);
// }, [feed.length]);

//   return (
//     <section className="py-20 bg-[#fafafa] overflow-hidden">
//       {/* Title */}
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold">ON THE FEED</h2>
//         <p className="text-gray-600 mt-2">
//           See what our community is wearing
//         </p>
//       </div>

//       {/* 3D Feed */}
//      <div
//   ref={containerRef}
//   className="
//     flex items-center gap-8 px-12
//     overflow-x-auto
//     scrollbar-hide
//   "
//   style={{ perspective: "1200px" }}
// >

//         {feed.map((item, i) => {
//           const distance = i - active;
//           const abs = Math.abs(distance);

//           return (
//             <div
//               key={item.id}
//               className="transition-all duration-500 ease-out"
//               style={{
//                 transform: `
//                   translateX(${distance * 40}px)
//                   translateY(${abs * 18}px)
//                   scale(${1 - abs * 0.12})
//                   rotateY(${distance * 6}deg)
//                 `,
//                 opacity: abs > 4 ? 0 : 1,
//               }}
//             >
//               <div className="w-[260px] md:w-[320px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl bg-black">
//                 <video
//                   src={item.src}
//                   muted
//                   loop
//                   playsInline
//                   autoPlay={i === active}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <p className="text-center text-sm text-gray-500 mt-8">
//         Scroll to explore
//       </p>
//     </section>
//   );
// }
'use client';

import { useEffect, useRef, useState } from "react";

export default function OnTheFeed_FocusTunnel() {
  const baseFeed = [
    "ForBiggerJoyrides",
    "ForBiggerEscapes",
    "ForBiggerFun",
    "ForBiggerBlazes",
    "BigBuckBunny",
  ];

  const feed = [...baseFeed, ...baseFeed].map((v, i) => ({
    id: i,
    src: `https://storage.googleapis.com/gtv-videos-bucket/sample/${v}.mp4`,
  }));

  const containerRef = useRef(null);
  const [active, setActive] = useState(4);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const CARD_WIDTH = 320 + 32; // card + gap

    const onScroll = () => {
      const index = Math.round(el.scrollLeft / CARD_WIDTH);
      setActive(Math.min(Math.max(index, 0), feed.length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [feed.length]);

  return (
    <section className="py-20 bg-[#fafafa] overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold">ON THE FEED</h2>
        <p className="text-gray-600 mt-2">
          See what our community is wearing
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex gap-8 px-16 overflow-x-auto scrollbar-hide"
        style={{ perspective: "1200px" }}
      >
        {feed.map((item, i) => {
          const distance = Math.abs(i - active);

          return (
            <div
              key={item.id}
              className="transition-all duration-500 ease-out shrink-0"
              style={{
                transform: `scale(${1 - distance * 0.12})`,
                opacity: distance > 2 ? 0.35 : 1 - distance * 0.25,
                filter: distance === 0 ? "none" : "saturate(0.65)",
              }}
            >
              <div className="w-[260px] md:w-[320px] aspect-3/4 rounded-[28px] overflow-hidden shadow-2xl bg-black">
                <video
                  src={item.src}
                  muted
                  loop
                  playsInline
                  autoPlay={i === active}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Swipe horizontally to explore
      </p>
    </section>
  );
}


// 'use client';

// import { useEffect, useRef } from "react";

// export default function OnTheFeed_BrokenGrid() {
//   const feed = [
//     "ForBiggerJoyrides",
//     "ForBiggerEscapes",
//     "ForBiggerFun",
//     "ForBiggerBlazes",
//     "BigBuckBunny",
//     "ForBiggerJoyrides",
//     "ForBiggerEscapes",
//   ].map((v, i) => ({
//     id: i,
//     src: `https://storage.googleapis.com/gtv-videos-bucket/sample/${v}.mp4`,
//   }));

//   const containerRef = useRef(null);

//   // autoplay when visible
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const videos = container.querySelectorAll("video");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.intersectionRatio > 0.6) {
//             e.target.play();
//           } else {
//             e.target.pause();
//             e.target.currentTime = 0;
//           }
//         });
//       },
//       { threshold: 0.6 }
//     );

//     videos.forEach((v) => observer.observe(v));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="py-20 bg-[#fafafa] overflow-hidden">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold">ON THE FEED</h2>
//         <p className="text-gray-600 mt-2">
//           Styled by the community
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         className="flex gap-10 px-16 overflow-x-auto scrollbar-hide"
//       >
//         {feed.map((item, i) => {
//           const isTall = i % 2 === 0;

//           return (
//             <div
//               key={item.id}
//               className="flex-shrink-0 transition-transform duration-500"
//               style={{
//                 transform: `translateY(${isTall ? "0px" : "48px"})`,
//               }}
//             >
//               <div
//                 className={`
//                   w-[260px]
//                   ${isTall ? "h-[440px]" : "h-[360px]"}
//                   rounded-[28px]
//                   overflow-hidden
//                   shadow-xl
//                   bg-black
//                 `}
//               >
//                 <video
//                   src={item.src}
//                   muted
//                   loop
//                   playsInline
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <p className="text-center text-sm text-gray-500 mt-8">
//         Swipe to explore the lookbook
//       </p>
//     </section>
//   );
// }



// 'use client';

// import { useEffect, useRef, useState } from "react";

// export default function OnTheFeed_BrokenGrid() {
//   const baseFeed = [
//     "ForBiggerJoyrides",
//     "ForBiggerEscapes",
//     "ForBiggerFun",
//     "ForBiggerBlazes",
//     "BigBuckBunny",
//   ];

//   // duplicate for infinite illusion
//   const feed = [...baseFeed, ...baseFeed, ...baseFeed].map((v, i) => ({
//     id: i,
//     src: `https://storage.googleapis.com/gtv-videos-bucket/sample/${v}.mp4`,
//   }));

//   const containerRef = useRef(null);
//   const [active, setActive] = useState(0);

//   // 🔥 horizontal-center detection
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const cards = Array.from(container.children);

//     const onScroll = () => {
//       const center =
//         container.scrollLeft + container.offsetWidth / 2;

//       let closestIndex = 0;
//       let minDistance = Infinity;

//       cards.forEach((card, i) => {
//         const cardCenter =
//           card.offsetLeft + card.offsetWidth / 2;
//         const distance = Math.abs(center - cardCenter);

//         if (distance < minDistance) {
//           minDistance = distance;
//           closestIndex = i;
//         }
//       });

//       setActive(closestIndex);
//     };

//     container.addEventListener("scroll", onScroll, { passive: true });

//     // start from middle set (infinite illusion)
//     container.scrollLeft = container.scrollWidth / 3;

//     return () => container.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <section className="py-20 bg-[#fafafa] overflow-hidden">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold">
//           ON THE FEED
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Styled by the community
//         </p>
//       </div>

//       <div
//         ref={containerRef}
//         className="flex gap-10 px-16 overflow-x-auto scrollbar-hide"
//       >
//         {feed.map((item, i) => {
//           const distance = Math.abs(i - active);

//           // center OR edge emphasis
//           const isCenter = distance === 0;
//           const isEdge = distance >= feed.length - 2 || distance === 2;

//           const scale = isCenter || isEdge ? 1 : 0.86;
//           const translateY = isCenter || isEdge ? "0px" : "48px";

//           return (
//             <div
//               key={item.id}
//               className="flex-shrink-0 transition-all duration-500 ease-out"
//               style={{
//                 transform: `
//           translateY(${translateY})
//           scale(${scale})
//         `,
//                 opacity: distance > 4 ? 0 : 1,
//               }}
//             >
//               <div className="w-[260px] md:w-[320px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl bg-black">
//                 <video
//                   src={item.src}
//                   muted
//                   loop
//                   playsInline
//                   autoPlay={isCenter}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           );
//         })}

//       </div>

//       <p className="text-center text-sm text-gray-500 mt-8">
//         Swipe horizontally to explore
//       </p>
//     </section>
//   );
// }
