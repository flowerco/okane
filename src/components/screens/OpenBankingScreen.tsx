function OpenBankingScreen() {
  return (
    <>
      <h1>Hello Open Banking</h1>
      <p>You have been successfully registered.</p>
      <a href="https://link.tink.com/1.0/transactions/connect-accounts/?client_id=5fd4f98dc8b7481384690464f1ae71e0&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&market=GB&locale=en_US&test=true">
        Link to your bank account
      </a>
    </>
  );
}

export default OpenBankingScreen;
