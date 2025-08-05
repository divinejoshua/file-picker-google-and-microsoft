"use client"
import  { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'

export default function Home() {

  //Google Implementation
  const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_KEY!,
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }



  //Microsoft Implementation
  useEffect(() => {
    // Load the OneDrive SDK script
    const script = document.createElement('script');
    script.src = 'https://js.live.net/v7.2/OneDrive.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openOneDrivePicker = () => {
    const odOptions = {
      clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!, // Replace with your registered app's client ID
      action: 'query',
      multiSelect: true,
      advanced: {
        filter: '.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf',
      },
      success: (files: any) => {
        console.log('Selected files:', files);
      },
      cancel: () => {
        console.log('User cancelled picker.');
      },
      error: (e: any) => {
        console.error('OneDrive Picker error:', e);
      },
    };

    if ((window as any).OneDrive) {
      (window as any).OneDrive.open(odOptions);
    } else {
      alert('OneDrive SDK not loaded yet.');
    }

  }


  return (
    <div>
      <h1>File Picker</h1>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenPicker}>Google Picker</button>

      <button
        onClick={openOneDrivePicker}
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open OneDrive Picker
      </button>
    </div>
  );
}
