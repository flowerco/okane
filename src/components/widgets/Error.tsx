import scrooge from '../../assets/scrooge.png';

interface Iprops  {
  error: string | null | undefined
}

export const Error = (props: Iprops) => {

  return (<div className="w-full h-full flex justify-center items-center flex-col pb-16">
  <h1 className='text-red-500 w-9/12 text-center'> Mr. Money encountered an error. </h1>
  <p className='text-red-200 w-9/12 text-center '>Error: {props.error}</p>
  <img src={scrooge} className="object-cover rounded-xl w-9/12"></img>


</div>)

}