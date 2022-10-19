import barclays from '../../assets/barclays.jpeg';
import revolut from '../../assets/Revolut.png';
import hsbc from '../../assets/HSBC.png';

function OpenBankingScreen() {
  const tinkLink =
    'https://link.tink.com/1.0/transactions/connect-accounts/?client_id=5fd4f98dc8b7481384690464f1ae71e0&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&market=GB&locale=en_US&test=true';

  return (
    <div className="grid place-items-center w-fit mx-auto p-10 mt-10 py-6 mb-4 bg-white rounded-lg border shadow-md text-center ">
      <h1 className="mb-2 text-2xl font-bold">Welcome to Okané</h1>
      <p>Our goal is to help you better understand your finances.</p>

      <div className="w-8/12 mt-8 ">
        <p>
          In order to use our app, you need to connect to your bank account.
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <a href={tinkLink}>
          <img
            className="w-16 h-16 inline border rounded-md"
            src={hsbc}
            alt="HSBC"></img>
        </a>
        <a href={tinkLink}>
          <img
            className="w-16 h-16 inline border rounded-md"
            src={barclays}
            alt="Barclays"></img>
        </a>
        <a href={tinkLink}>
          <img
            className="w-16 h-16 inline border rounded-md"
            src={revolut}
            alt="Revolut"></img>
        </a>
      </div>
    </div>
  );
}

export default OpenBankingScreen;
