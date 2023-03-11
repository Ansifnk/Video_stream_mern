import moment from 'moment/moment'
import React from 'react'

const VideoItem = ({ video }) => {
    const { likes, name, thumbnail, upload_date } = video
    return (
        <div className='m-5 w-1/5 border  rounded-lg overflow-hidden cursor-pointer ' >
            <img
                src={thumbnail}
                className='w-full h-28'
            />
            <div
                className='p-3'
            >
                <h3>{name}</h3>
                <p className='text-xs text-slate-500' >{likes} likes | {moment(upload_date).fromNow()}</p>
            </div>
        </div>
    )
}

export default VideoItem