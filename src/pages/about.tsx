import { useTranslation } from 'next-i18next';

import 'regenerator-runtime/runtime';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => {
  const { t } = useTranslation();

  return (
    <Main meta={<Meta title={t('title')} description={t('description')} />}>
      <div>
        <div className="container flex justify-center mx-auto pt-16">
          <div>
            <p className="text-gray-500 text-lg text-center font-normal pb-3">
              BUILDING TEAM
            </p>
            <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">
              The Talented People Behind the Scenes of the Organization
            </h1>
          </div>
        </div>
        <div className="w-full bg-gray-100 px-10 pt-10">
          <div className="container mx-auto">
            <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
              <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                <div className="rounded overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src="https://pbs.twimg.com/profile_images/1485547824255176707/DSHQAsO7_400x400.jpg"
                        alt=""
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <div className="font-bold text-3xl text-center pb-1">
                      Nate Dinh
                    </div>
                    <p className="text-gray-800 text-sm text-center">
                      CoinMarketFi Team
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      Mobile application developer & Blockchain enthusiast
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </div>
                      </a>
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-twitter"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                          </svg>
                        </div>
                      </a>
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram"
                          >
                            <rect
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              ry={5}
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                <div className="rounded overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.18169-9/299702_191607697578135_222854371_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MqaZslX4a_MAX9pTjwq&_nc_ht=scontent-nrt1-1.xx&oh=00_AT-XLNmdjqkx2e1QxC628BoS_I43m7dfrw_pwre85_oj-w&oe=622E8AC8"
                        alt=""
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <div className="font-bold text-3xl text-center pb-1">
                      Truong Nguyen Xuan
                    </div>
                    <p className="text-gray-800 text-sm text-center">
                      CoinMarketFi Team
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      The emphasis on innovation and technology in our companies
                      has resulted in a few of them establishing global
                      benchmarks in product design and development.
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </div>
                      </a>
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-twitter"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                          </svg>
                        </div>
                      </a>
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram"
                          >
                            <rect
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              ry={5}
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                <div className="rounded overflow-hidden shadow-md bg-white">
                  <div className="absolute -mt-20 w-full flex justify-center">
                    <div className="h-32 w-32">
                      <img
                        src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.18169-9/230330_114015938682437_7857671_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8ZUsIghk0BMAX9E8eRP&tn=F1RtaOL4wfNrhP6H&_nc_ht=scontent-nrt1-1.xx&oh=00_AT-rNfEXVItoBfAnSKnDEjDtq0m-bkuAjOAs4xm8slpnTw&oe=622CEBFE"
                        alt=""
                        className="rounded-full object-cover h-full w-full shadow-md"
                      />
                    </div>
                  </div>
                  <div className="px-6 mt-16">
                    <div className="font-bold text-3xl text-center pb-1">
                      Vinh Vu Van
                    </div>
                    <p className="text-gray-800 text-sm text-center">
                      CoinMarketFi Team
                    </p>
                    <p className="text-center text-gray-600 text-base pt-3 font-normal">
                      Our services encompass the assessment and repair of
                      property damage caused by water, fire, smoke, or mold. We
                      can also be a part of the restoration.
                    </p>
                    <div className="w-full flex justify-center pt-5 pb-5">
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-github"
                          >
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </div>
                      </a>
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-twitter"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                          </svg>
                        </div>
                      </a>
                      <a href="" className="mx-5">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#718096"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-instagram"
                          >
                            <rect
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              ry={5}
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default About;
