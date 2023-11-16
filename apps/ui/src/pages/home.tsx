import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

export default function Home() {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <main className='flex flex-col items-center p-20 text-gray-400'>
      <ImgCrop rotationSlider>
        <Upload
          action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
          listType='picture-card'
          fileList={fileList}
          onChange={onChange}
          onPreview={(file) => console.log('OPEN', file)}
        >
          {fileList.length < 7 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </main>
  );
}
