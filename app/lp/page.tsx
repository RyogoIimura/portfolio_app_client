"use client";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import Gsap from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { API_URL } from "@/constants/url";
import { useUsers } from "../../hooks/useUsers";
import { userType } from "@/types/types";
import { Responsive } from "../utils/Responsive";
import { PROJECT } from "@/data/AppData";
import { vw } from "../utils/Responsive";
import { manrope, dela_gothic } from "../utils/Fonts";

export default function Lp() {
  const { data: session } = useSession();
  const { users, mutate } = useUsers();
  // console.log(session, users);

  useEffect(() => {
    const handleCreateUser = async () => {
      const response = await fetch(`${API_URL}/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: session?.user?.id,
          name: session?.user?.name,
          email: session?.user?.email,
        }),
      });
  
      if (response.ok) {
        const newUser = await response.json();
        mutate([...users, newUser]);
      }
    };

    if(session){
      let createFlag = true;
      users?.map((user: userType) => {
        if( session?.user?.id === user.id ) createFlag = false;
      })
      if( createFlag === true ) handleCreateUser();
    }
  }, [session, users, mutate])

  const linksName = ['CONCEPT', 'FEATURE', 'SAUNA', 'PRICE'];

  useEffect(() => {
    const gsap = Gsap;
    gsap.registerPlugin(ScrollToPlugin)
    gsap.registerPlugin(ScrollTrigger);

    const parallaxElm: Array<HTMLElement> = gsap.utils.toArray(".parallaxImg");
    parallaxElm.forEach((e) => {
      gsap.fromTo( e,
        { x: 0 },
        {
          x: -300,
          scrollTrigger: {
            trigger: e,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            // markers: true
          }
        }
      );
    });
  }),[];

  return (
    <>
      <div>
        <Swiper
          modules={[Autoplay, EffectFade]}
          loop={true}
          effect="fade"
          speed={500}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          css={styles.fvSwiper}
        >
          <SwiperSlide>
            <Image src="/images/lp/fv_1_pc.jpg" alt="Fv1 Img" layout="fill" objectFit="contain" css={Responsive.pc} />
            <Image src="/images/lp/fv_1_sp.jpg" alt="Fv1 Img" layout="fill" objectFit="contain" css={Responsive.sp} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/images/lp/fv_2_pc.jpg" alt="Fv2 Img" layout="fill" objectFit="contain" css={Responsive.pc} />
            <Image src="/images/lp/fv_2_sp.jpg" alt="Fv2 Img" layout="fill" objectFit="contain" css={Responsive.sp} />
          </SwiperSlide>
        </Swiper>
        <p
          className={`${manrope.className}`}
        >RIVERSIDE SAUNA RENTAL</p>
        <h1
          className={`${dela_gothic.className}`}
        >THE AZUMA<br/>GORGE SAUNA </h1>
        <div>
          {linksName.map((value, index) => (
            <div
              key={index}
              className={` ${dela_gothic.className}`}
              css={styles.pageLink}
            >
              <span
                css={styles.pageLinkDot}
              >・&nbsp;</span>
              {linksName[index]}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2
          className={`${dela_gothic.className}`}
          css={styles.contentsTitle}
        >CONCEPT</h2>
        <div css={styles.parallaxContainer}>
          {[1,2,3,4,5,6,7,8].map((value, index) => (
            <div key={index} css={styles.parallaxImg} className="parallaxImg">
              <Image src="/images/lp/look_1.jpg" alt="Look1 Img" layout="fill" objectFit="contain" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2
          className={`${dela_gothic.className}`}
          css={styles.contentsTitle}
        >SAUNA</h2>
      </div>

      <div>
        <h2
          className={`${dela_gothic.className}`}
          css={styles.contentsTitle}
        >PRICE</h2>
      </div>
    </>
  );
}

const styles = {
  fvSwiper: css `
    width: ${vw(650)};
    height: ${vw(650)};
    margin: ${vw(160)} auto 0;
    border-radius: ${vw(30)};
    overflow: hidden;

    @media (min-width: ${PROJECT.BP}px) {
      width: 840px;
      height: 530px;
      margin: 120px auto 0;
      border-radius: 15px;

      @media (max-width: 1000px) {
        width: calc(100vw * (840/1000));
        height: calc(100vw * (530/1000));
      }
    }
  `,
  pageLink: css `
    font-size: ${vw(38)};
    font-weight: 800;
    letter-spacing: .1em;
    color: ${PROJECT.KEYCOLOR};
    margin-top: ${vw(60)};
    text-decoration: none;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 25px;
      margin-top: 50px;
    }
  `,
  pageLinkDot: css `
    color: ${PROJECT.SUBCOLOR};
  `,

  contentsTitle: css `
    font-size: ${vw(36)};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 30px;
    }
  `,

  parallaxContainer: css `
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
  `,
  parallaxImg: css `
    width: ${vw(300)};
    height: ${vw(300)};
    position: relative;
    flex-shrink: 0;

    @media (min-width: ${PROJECT.BP}px) {
      width: 364px;
      height: 364px;
    }
  `,
}