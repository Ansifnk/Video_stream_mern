import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'
import { Eye, Like1, Send2, Share } from 'iconsax-react'
const Video = () => {

    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const { videoId } = useParams()


    const getVideoDetails = async () => {
        setLoading(true)
        try {
            let response = await axios.get(BASE_URL + 'video/' + videoId,)
            if (response.status == 200) {
                console.log(response.data)
                setVideo(response.data)
                setLoading(false)
            }
        } catch (error) {
            alert("Couldn't get video, Try again")
            setLoading(false)
        }
    }

    const updateLike = async () => {
        try {
            let response = await axios.post(BASE_URL + 'video/like', { _id: videoId })
            if (response.status == 200) {
                // console.log(response.data)
                alert('Liked')
                setVideo(response.data)
            }
        } catch (error) {
            alert("Couldn't like video, Try again")
        }
    }
    const updateView = async () => {
        try {
            let response = await axios.post(BASE_URL + 'video/views', { _id: videoId })
            if (response.status == 200) {
                setVideo(response.data)
            }
        } catch (error) {
            alert("Couldn't like video, Try again")
        }
    }

    const shareHandler = () => {
        let url = window.location.href
        navigator.clipboard.writeText(`${url}`)
        alert('copied to clipboard')
    }

    useEffect(() => {
        getVideoDetails()
    }, [])

    if (loading) return <h1>Loading...</h1>

    return (
        <div className='p-10 ' >
            <div className='flex'>
                <ReactPlayer
                    controls={true}
                    url={video?.video_url}
                    onStart={updateView}
                // style={{ width: '100%' }}
                />

                <div className='px-3 w-1/2' >
                    <h1 className='text-xl font-semibold' >{video?.name}</h1>

                    <div className='mt-5 w-full flex justify-between' >
                        <div className='w-1/3 flex flex-col items-center' >
                            <Like1
                                onClick={updateLike}
                                className=' cursor-pointer'
                                size={32}
                                color="black"
                            />
                            <p className='text-slate-600' >{video?.likes} likes</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center' >
                            <Eye
                                className=''
                                size={32}
                                color="black"
                            />
                            <p className='text-slate-600'>{video?.views} views</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center' >
                            <Send2
                                onClick={shareHandler}
                                className=' cursor-pointer'
                                size={32}
                                color="black"
                            />
                            <p className='text-slate-600'>Share</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video