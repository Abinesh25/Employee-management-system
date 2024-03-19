import './User.css';
export const User = () => {
  return (
    <div>
      <div className='flex-container'>
        {post.map(x=>(<div className='flex-items'><img src={x.img} width={150} height={150} />
        <h1>{x.name}</h1>
        <p>{x.marks}</p>
        <p>{x.iq}</p>
        <button id='seemrk'>see details</button>
         </div>))}
      </div>
    </div>
  )
}
