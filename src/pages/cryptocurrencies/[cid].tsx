import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Arrow } from '../../components/icon';
import { Stat } from '../../components/stat';
import { CRYPTOCURRENCY_BY_CID } from '../../graphql/cryptocurrency';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { apolloClient } from '../../utils/apollo';

export const getServerSideProps = async (context: any) => {
  // const { page } = context.query;
  // const { rowPerPage } = context.query;
  // const sortColumn = context.query.sortColumn || 'id';
  // const sortDirection = context.query.sortDirection || 'ASC';
  //
  // if (!page) {
  //   return { props: { errors: 'INPUT_ERROR' } };
  // }
  const { data } = await apolloClient.query({
    query: CRYPTOCURRENCY_BY_CID,
    variables: {
      cid: context.query.cid,
    },
  });
  // const arr = data.exchanges;
  // Pass data to the page via props
  return {
    props: {
      cryptocurrency: data.cryptocurrency,
      ...(await serverSideTranslations(context.locale, [
        'exchanges',
        'common',
      ])),
    },
  };
};

const Exchange = (props: any) => {
  // const router = useRouter();
  // console.log(cryptocurrency);
  const { t } = useTranslation('exchanges');
  const { cryptocurrency } = props;
  return (
    <Main meta={<Meta title={t('title')} description={t('description')} />}>
      <header className="flex flex-wrap pt-10">
        <div className="flex flex-wrap container mx-auto w-full md:w-2/3 justify-between ">
          <div className="flex items-center my-5">
            <img
              className="ml-5 h-11 w-auto"
              src={cryptocurrency.image.large}
              alt=""
            ></img>
            <h1 className="text-5xl leading-none font-semibold ml-2">
              {cryptocurrency.name}
            </h1>
            <span className="ml-2 text-sm uppercase rounded-lg bg-gray-300 px-2">
              {cryptocurrency.symbol}
            </span>
          </div>
          <div className="">
            <div className="text-xs">{cryptocurrency.name} Price</div>
            <div className="text-4xl flex items-center">
              <span className="font-bold mr-2">
                ${cryptocurrency?.market_data?.current_price?.usd}
              </span>
              <span className="text-base font-bold px-2 py-1 my-2 rounded-lg flex text-white bg-red-500 items-center">
                <Arrow
                  className="mr-1"
                  width="10"
                  height="10"
                  direction="down"
                  color="white"
                />
                0.81%
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex mx-auto md:w-2/3 justify-between">
          <div className="">
            algorithm:{' '}
            <span className="ml-2 text-xs uppercase rounded-lg bg-gray-300 px-2">
              {cryptocurrency.hashing_algorithm}
            </span>
          </div>
          <div className="">
            <div className="w-full">
              Country: {cryptocurrency.country_origin}
            </div>
            <div className="w-full">
              Score: {cryptocurrency.community_score}
            </div>
          </div>
        </div>
        <Stat cryptocurrency={cryptocurrency} />

        <div className="border-b border-gray-300 w-full mt-5 p-5">
          <a className="font-medium text-white hover:text-gray-500 px-4 pb-1 bg-blue-600 rounded-lg mr-4">
            {t('Overview')}
          </a>
          <a className="font-medium text-gray-900 hover:text-gray-500 px-4 pb-1">
            {t('Market')}
          </a>
          <a className="font-medium text-gray-900 hover:text-gray-500 px-4 pb-1">
            {t('Historical Data')}
          </a>
        </div>

        <div
          className="mx-5 my-5"
          dangerouslySetInnerHTML={{ __html: cryptocurrency.description.en }}
        />
      </header>
    </Main>
  );
};

export default Exchange;
