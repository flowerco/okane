import scrooge from '../../assets/scrooge.png';


export const Error = () => {

  return (<div className="w-full h-full flex justify-center items-center flex-col -mt-16">
  <h1 className='text-red-500 w-9/12 text-center'> Mr. Money encountered an error. </h1>
  <p className='text-red-200 w-9/12 text-center '>Please reload Okane.</p>
  <img src={scrooge} className="object-cover rounded-xl w-9/12"></img>


</div>)

}