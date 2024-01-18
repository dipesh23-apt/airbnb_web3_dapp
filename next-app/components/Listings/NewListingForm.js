import { useState } from 'react'
import { useAirbnb } from '../../hooks/useAirbnb'
import Web3 from 'web3'
import { UploadButton } from "@bytescale/upload-widget-react";
import * as Bytescale from "@bytescale/sdk";

const NewListingForm = setShowNewListingModal => {
  const [name, setName] = useState('')
  const [propertyAddress, setPropertyAddress] = useState('')
  const [description, setDescription] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')

  const { addListing } = useAirbnb()

  // const uploader = new Uploader({
  //   apiKey: 'free',
  // })
  const options = {
    apiKey: "free", // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1
  };

  const uploadManager = new Bytescale.UploadManager({
    apiKey: "free" ,// Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1
  });
  const handleUploadPropertyImage2 = async() => {
      uploadManager.upload(options).then(
    // uploadManager.upload(options).then(
      files => {
        if (files.length === 0) {
          alert("No image selected.");
        } else {
          // Update state with the file URL
          setImgURL(files[0].fileUrl);
        }
      },
      error => alert(error)
    );
  };


  function handleUploadPropertyImage(){
  //const handleUploadPropertyImage = async () => {
    // uploader
    //   .open({ multi: false })
    //   .then(files => {
    //     if (files.length === 0) {
    //       alert('No files selected.')
    //     } else {
    //       setImgURL(files[0].fileUrl)
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
        setImgURL(files[0].fileUrl)
        // Bytescale.UploadWidget.upload(options).then(
        //   files => alert(files.length === 0 
        //                 ? "No image selected." 
        //                 : setImgURL(files[0].fileUrl)),
        //   error => alert(error)
        // );
      }

  const onCreate = event =>{
    event.preventDefault()
    console.log(name,propertyAddress,imgURL)
    const priceInWei=Web3.utils.toWei(pricePerDay, 'ether')
    addListing(name,propertyAddress,description,imgURL,priceInWei)
  }

  const styles = {
    wrapper: `mt-2`,
    formWrapper: `grid grid-cols-1 gap-3`,
    formInputContainer: `flex flex-col border rounded-lg px-3 py-2`,
    inputLabel: `text-xs font-light`,
    input: `outline-none bg-transparent text-sm pt-1`,
  }

  return (
  
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
      <script src="https://js.bytescale.com/upload-widget/v4"></script>
        <label className={styles.formInputContainer}>
          <span className={styles.inputLabel}>Name</span>
          <input
            onChange={event => setName(event.target.value)}
            value={name}
            className={styles.input}
          />
        </label>

        <label className={styles.formInputContainer}>
          <span className={styles.inputLabel}>Address</span>
          <input
            onChange={event => setPropertyAddress(event.target.value)}
            value={propertyAddress}
            className={styles.input}
          />
        </label>

        <label className={styles.formInputContainer}>
          <span className={styles.inputLabel}>Description</span>
          <input
            onChange={event => setDescription(event.target.value)}
            value={description}
            className={styles.input}
          />
        </label>

        {/* <div>
          <button onClick={handleUploadPropertyImage}>Upload new Image</button>
         </div> */}

         <div>
         <UploadButton options={options}
                onComplete={
                  files=> {
                    setImgURL(files[0].fileUrl);
                    console.log(imgURL);
                    alert(files.map(x => x.fileUrl).join("\n"));
                  }
                }>
                {({onClick}) =>
                <button onClick={onClick}>
                  Upload new Image
                </button>
                }
         </UploadButton>
         </div>

        <label className={styles.formInputContainer}>
          <span className={styles.inputLabel}>Price per Day</span>
          <input
            onChange={event => setPricePerDay(event.target.value)}
            value={pricePerDay}
            className={styles.input}
          />
        </label>
      </div>

      <div className='mt-4 flex justify-end'>
        <button
          onClick={onCreate}
          disabled={
            !name || !propertyAddress || !description || !imgURL || !pricePerDay
          }
          type='button'
          className='border rounded-lg px-4 py-2 text-sm font-medium'
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default NewListingForm
