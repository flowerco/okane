import PropTypes from 'prop-types'

export const YoutubeEmbed = ({ embedId } : {embedId:string}) => {
  return (
    <div className="overflow-hidden pb-[56.25%] relative h-0" >
      <iframe 
        className='absolute top-0 left-0 h-full w-full border-2 border-lime-500 rounded-lg'
        width={800}
        height={480}
        src={`https://youtube.com/embed/${embedId}?mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded Youtube" />
    </div>
  )
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
} 