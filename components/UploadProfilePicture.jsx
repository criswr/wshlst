import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Compressor from 'compressorjs'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import profileIcon from '../public/profileIcon.svg'
import storage from './FirebaseConfig'
import Spinner from './Spinner'



const UploadProfilePicture = ({img, uuid, onSave}) => {
    const [picture, setPicture] = useState()
    const [pictureUploading, setPictureUploading] = useState(false)
    useEffect(() => setPicture(img), [img])
    
    
    const handleCompressedUpload = (e) => {
        const image = e.target.files[0]
        if (!image) return
        
        Reflect.construct(Compressor, [
        image, {
        quality: 0.4,
        width: 200,
        height: 200,
        resize: 'cover',
        convertTypes: ['image/png', 'image/webp', 'image/gif'],
        convertSize: 1,
        success: (res) => {
/*             const formData = new FormData();
            formData.append('image', res, res.name)
            console.log('res', formData) */
                const storageRef = ref(storage, `avatar/${uuid}.jpg`)
                const uploadTask = uploadBytesResumable(storageRef, res)
                uploadTask.on("state_changed",
                (snapshot) => {
                  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                  progress < 100 && setPictureUploading(true)
                },
                (error) => {
                    console.log(error)
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onSave({newImg: downloadURL})
                    setPicture(downloadURL)
                    setPictureUploading(false)
                  });
                }
              )
        },
        }])
    }
    
    return (
        <div className='w-full flex flex-col items-center p-2'>
            <input
                accept='image/*,capture=camera'
                capture='”camera'
                type='file'
                id='profilePic'
                className='hidden'
                onChange={(event) => handleCompressedUpload(event)}
            />

            <label className='cursor-pointer relative flex justify-center items-center hover:opacity-50' htmlFor='profilePic'>
                <Image height={100} width={100} alt='Foto de perfil' className={`rounded-full ${pictureUploading && 'opacity-40'}`} src={picture || profileIcon}/>
                <Spinner className={`absolute ${pictureUploading ? '' : 'hidden'}`} color='black' />
            </label>
        </div>
    )
}

export default UploadProfilePicture