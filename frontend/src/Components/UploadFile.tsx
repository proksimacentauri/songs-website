import React, {useRef} from 'react';

interface UploadFileProps {
    setFile: Function;
    accept: string;
    children?: React.ReactNode; 
}

    const FileUpload: React.FC<UploadFileProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return; 
        setFile(e.target.files[0]);
    };

    return (
        <div onClick={() => ref.current?.click()}>
            <input
                ref={ref}
                type="file"
                accept={accept}
                style={{display: 'none'}}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;
