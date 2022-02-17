import { InfoMark, Arrow } from './icon';

const Stat = (cryptocurrency: any) => {
  // console.log(cryptocurrency);
  // const { t } = useTranslation('exchanges');
  return (
    <div className="flex w-full mx-5 text-sm bg-gray-100 p-5 mt-5">
      <div className="flex-1">
        <div className="flex items-center">
          Market cap
          <InfoMark width="14" height="14" />
        </div>
        <div className="font-bold">$829,476,942,831</div>
        <div className="flex items-center text-green-600 mt-2">
          <Arrow
            className="mr-1"
            width="10"
            height="10"
            color="#16c784"
            direction=""
          />
          0.81%
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          Fully Diluted Market Cap
          <InfoMark width="14" height="14" />
        </div>
        <div>{cryptocurrency?.fully_diluted_valuation?.usd || '-'}</div>
        <div className="flex items-center text-red-600 mt-2">
          <Arrow
            className="mr-1"
            direction="down"
            width="10"
            height="10"
            color=""
          />
          0.56%
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          Volume{' '}
          <span className="mr-1 ml-1 text-sm rounded-sm bg-gray-200 px-1">
            24h
          </span>
          <InfoMark width="14" height="14" />
        </div>
        <div>{cryptocurrency?.fully_diluted_valuation?.usd || '-'}</div>
        <div className="flex items-center text-red-600 mt-2">
          <Arrow
            className="mr-1"
            direction="down"
            width="10"
            height="10"
            color=""
          />
          0.56%
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex items-center">
            Circulating Supply
            <InfoMark width="14" height="14" />
          </div>
          <div className="font-bold">
            ${cryptocurrency?.market_data?.circulating_supply || '-'}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            Max Supply
            <InfoMark width="14" height="14" />
          </div>
          <div className="font-bold">
            ${cryptocurrency?.market_data?.max_supply || '-'}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            Total Supply
            <InfoMark width="14" height="14" />
          </div>
          <div className="font-bold">
            ${cryptocurrency?.market_data?.total_supply || '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Stat };
