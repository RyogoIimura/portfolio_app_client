"use client";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import Image from "next/image";
import { css } from "@emotion/react";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';

import { API_URL } from "@/constants/url";
import { useUsers } from "../../hooks/useUsers";
import { userType } from "@/types/types";
import { Responsive } from "../utils/Responsive";
import { PROJECT } from "@/data/AppData";
import { vw } from "../utils/Responsive";
import { manrope, dela_gothic } from "../utils/Fonts";
import { fvAnimation, parallaxImg, toLpContent } from "../utils/lp/gsapAnimation";
import Header from "../components/Header";

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
          complete: false
        }),
      });
  
      if (response.ok) {
        const newUser = await response.json();
        mutate([...users, newUser]);
      }
    };

    if(session?.user?.id){
      let createFlag = true;
      users?.map((user: userType) => {
        if( session.user?.id === user.id ) createFlag = false;
      })
      if( createFlag === true ) handleCreateUser();
    }
  }, [session, users, mutate])

  const linksName = ['CONCEPT', 'FEATURE', 'SAUNA', 'PRICE'];

  useEffect(() => {
    parallaxImg();
    toLpContent();
    fvAnimation();
  }),[];

  return (
    <>
      <Header page={'lp'} />
      <div
        id='fv'
        css={styles.fv}
      >
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
          id='fvSwiper'
        >
          <SwiperSlide>
            <Image src="/images/lp/fv_1_pc.jpg" alt="Fv1 Img" fill style={{ objectFit: 'contain'}} css={Responsive.pc} />
            <Image src="/images/lp/fv_1_sp.jpg" alt="Fv1 Img" fill style={{ objectFit: 'contain'}} css={Responsive.sp} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/images/lp/fv_2_pc.jpg" alt="Fv2 Img" fill style={{ objectFit: 'contain'}} css={Responsive.pc} />
            <Image src="/images/lp/fv_2_sp.jpg" alt="Fv2 Img" fill style={{ objectFit: 'contain'}} css={Responsive.sp} />
          </SwiperSlide>
        </Swiper>
        <div css={styles.fvTextWrapper}>
          <p
            id='subTitle'
            className={`${manrope.className}`}
            css={styles.subTitle}
          >RIVERSIDE SAUNA RENTAL</p>
          <h1
            id='title'
            className={`${dela_gothic.className}`}
            css={styles.title}
          >
            <span>T</span>
            <span>H</span>
            <span>E</span>
            <span>&nbsp;</span>
            <span>A</span>
            <span>Z</span>
            <span>U</span>
            <span>M</span>
            <span>A</span>
            <br/>
            <span>G</span>
            <span>O</span>
            <span>R</span>
            <span>G</span>
            <span>E</span>
            <span>&nbsp;</span>
            <span>S</span>
            <span>A</span>
            <span>U</span>
            <span>N</span>
            <span>A</span>
          </h1>
          <div css={styles.pageLinkWrapper}>
            {linksName.map((value, index) => (
              <div
                key={index}
                className={`${dela_gothic.className} pageLinkButton`}
                css={styles.pageLink}
                data-num={index}
              >
                <span
                  css={styles.pageLinkDot}
                >・&nbsp;</span>
                {linksName[index]}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="lpContent"
        css={[styles.contentsWrapper, styles.conceptWrapper]}
      >
        <h2
          className={`${dela_gothic.className}`}
          css={[styles.contentsTitle, styles.conceptTitle]}
        >CONCEPT</h2>
        <p
          css={[styles.contentsText, styles.conceptText]}
        >埼玉県飯能市の入間川にある吾妻峡は<br/>都心から約一時間で深い自然を堪能できます。<br/>THE AZUMA GORGE SAUNA ではテントサウナを<br/>レンタルすることができます。<br/>誰にも邪魔されずにサウナをして、川に入り整う。<br/>最高の休日をお過ごしください。</p>
      </div>

      <div css={styles.parallaxContainer}>
        {[1,2,3,4,5,6,7,8].map((value, index) => (
          <div key={index} css={styles.parallaxImg} className="parallaxImg">
            <Image src="/images/lp/parallax.jpg" alt="Parallax Img" fill style={{ objectFit: 'contain'}} />
          </div>
        ))}
      </div>

      <div
        className="lpContent"
        css={styles.contentsWrapper}
      >
        <h2
          className={`${dela_gothic.className}`}
          css={styles.contentsTitle}
        >FEATURE</h2>
        <p
          css={styles.contentsText}
        >吾妻峡に入ると一気に気温が下がり<br/>川が近くにあることを感じることができます。<br/>受付でサウナをレンタルして<br/>薪に火を起こし、サウナスタート。<br/>初心者の方はサポートいたします。<br/>サウナ以外にも、サウナハット、ポンチョ<br/>もレンタル出来ますので気軽に<br/>お申し付けください。
        </p>
        <div css={styles.featureImg1}>
          <Image src="/images/lp/feature_1.jpg" alt="Feature1 Img" fill style={{ objectFit: 'contain'}} />
        </div>
        <div css={styles.featureImg2}>
          <Image src="/images/lp/feature_2.jpg" alt="Feature2 Img" fill style={{ objectFit: 'contain'}} />
        </div>
      </div>

      <div
        className="lpContent"
        css={styles.bgWrapper}
      >
        <h2
          className={`${dela_gothic.className}`}
          css={styles.contentsTitle}
        >SAUNA</h2>
        <div css={styles.bgContent}>
          <p
            css={styles.bgText}
          >・温度　・・・　約110度<br/>・収容人数　・・・　最大4人<br/>・時間　・・・　3時間単位でレンタル可能です</p>
          <p
            css={[styles.bgText, styles.bgAnnotation]}
          >テントサウナの準備、薪の管理、撤収作業はお客様自身にお願いしています（レンタル時間内にお済ませください）<br/>※サポートが必要な方はお気軽にお申し付けください</p>
        </div>
      </div>

      <div
        className="lpContent"
        css={[styles.bgWrapper, styles.priceWrapper]}
      >
        <h2
          className={`${dela_gothic.className}`}
          css={styles.contentsTitle}
        >PRICE</h2>
        <div css={[styles.bgContent, styles.priceContent]}>
          <p
            css={[styles.bgText, styles.priceText]}
          >・テントサウナ（3時間）<br/>　2人　・・・　¥13,000(inc. tax)<br/>　3人　・・・　¥18,000(inc. tax)<br/>　4人　・・・　¥23,000(inc. tax)<br/>　5人　・・・　¥27,000(inc. tax)<br/>・サウナハット　・・・　¥500(inc. tax)<br/>・ポンチョ　・・・　¥1,000(inc. tax)
          </p>
          <div css={styles.priceImg}>
            <Image src="/images/lp/price.jpg" alt="Price Img" fill style={{ objectFit: 'contain'}} />
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  fv: css `
    opacity: 0;
  `,
  fvSwiper: css `
    width: ${vw(650)};
    height: ${vw(650)};
    margin: 0 auto;
    border-radius: ${vw(30)};
    overflow: hidden;

    @media (min-width: ${PROJECT.BP}px) {
      width: 840px;
      height: 530px;
      border-radius: 15px;

      @media (max-width: 920px) {
        width: calc(100vw * (840/920));
        height: calc(100vw * (530/920));
      }
    }
  `,
  fvTextWrapper: css`
    width: ${vw(608)};
    margin: ${vw(30)} auto 0;

    @media (min-width: ${PROJECT.BP}px) {
      width: 790px;
      margin: -54px auto 0;
      position: relative;
      z-index: 5;

      @media (max-width: 920px) {
        width: calc(100vw * (790/920));
        margin: calc(100vw * (-54/920)) auto 0;
      }
    }
  `,
  subTitle: css`
    font-size: ${vw(24)};
    font-weight: 600;
    letter-spacing: .05em;
    color: ${PROJECT.SUBCOLOR};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 18px;

      @media (max-width: 920px) {
        font-size: calc(100vw * (18/920));
      }
    }
  `,
  title: css`
    font-size: ${vw(52)};
    line-height: 1.2em;
    letter-spacing: .04em;
    color: ${PROJECT.KEYCOLOR};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 42px;

      @media (max-width: 920px) {
        font-size: calc(100vw * (42/920));
      }
    }
  `,
  pageLinkWrapper: css `
    width: 100%;
    margin-top: ${vw(80)};

    @media (min-width: ${PROJECT.BP}px) {
      display: flex;
      justify-content: center;
      margin-top: 80px;
    }
  `,
  pageLink: css `
    font-size: ${vw(28)};
    font-weight: 800;
    letter-spacing: .1em;
    color: ${PROJECT.KEYCOLOR};
    margin-top: ${vw(36)};
    text-decoration: none;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 18px;
      margin: 0 22px;
      cursor: pointer;
    }
  `,
  pageLinkDot: css `
    color: ${PROJECT.SUBCOLOR};
  `,

  contentsWrapper: css `
    padding: ${vw(140)} 0 ${vw(180)};

    @media (min-width: ${PROJECT.BP}px) {
      padding: 120px 0 150px;
    }
  `,
  contentsTitle: css `
    font-size: ${vw(36)};
    text-align: center;
    color: ${PROJECT.KEYCOLOR};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 30px;
    }
  `,
  contentsText: css `
    font-size: ${vw(24)};
    line-height: 2.5em;
    text-align: center;
    letter-spacing: .1em;
    margin-top: ${vw(60)};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 18px;
      margin-top: 60px;
    }
  `,

  conceptWrapper: css `
    background-color: ${PROJECT.KEYCOLOR};
    margin-top: ${vw(180)};

    @media (min-width: ${PROJECT.BP}px) {
      margin-top: 160px;
    }
  `,
  conceptTitle: css `
    color: #fff;
  `,
  conceptText: css `
    color: #fff;
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

  featureImg1: css `
    width: ${vw(650)};
    height: ${vw(488)};
    margin: ${vw(120)} auto 0;
    position: relative;

    @media (min-width: ${PROJECT.BP}px) {
      width: 650px;
      height: 450px;
      margin: 100px auto 0;
    }
  `,
  featureImg2: css `
    width: ${vw(340)};
    height: ${vw(500)};
    margin: ${vw(80)} auto 0;
    position: relative;

    @media (min-width: ${PROJECT.BP}px) {
      width: 340px;
      height: 500px;
      margin: 80px auto 0;
    }
  `,

  bgWrapper: css `
    width: ${vw(650)};
    padding: ${vw(80)} ${vw(40)} ${vw(60)};
    background-color: ${PROJECT.BGCOLOR};
    margin: 0 auto;

    @media (min-width: ${PROJECT.BP}px) {
      width: 600px;
      padding: 60px 38px 76px;
    }
  `,
  bgContent: css `
    margin-top: ${vw(46)};

    @media (min-width: ${PROJECT.BP}px) {
      margin-top: 30px;
    }
  `,
  bgText: css `
    font-size: ${vw(18)};
    line-height: 2.5em;
    letter-spacing: .05em;

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 14px;
    }
  `,
  bgAnnotation: css `
    font-size: ${vw(14)};
    margin-top: ${vw(40)};

    @media (min-width: ${PROJECT.BP}px) {
      font-size: 12px;
      margin-top: 30px;
    }
  `,

  priceWrapper: css `
    margin-top: ${vw(80)};

    @media (min-width: ${PROJECT.BP}px) {
      margin-top: 60px;
    }
  `,
  priceContent: css `
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  priceText: css `
    width: fit-content;
  `,
  priceImg: css `
    width: ${vw(160)};
    height: ${vw(210)};
    position: relative;

    @media (min-width: ${PROJECT.BP}px) {
      width: 172px;
      height: 226px;
    }
  `,
}