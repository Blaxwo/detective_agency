import React, { useState, useEffect } from 'react';
import { getDetectiveCases } from '../../../../Redux/casesReducer';
import { useSelector } from 'react-redux';
import style from './MyCasesDetective.module.css'

const DetectiveCases = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).name;
    const detectiveCases = getDetectiveCases(currentUser);
    const [selectedCase, setSelectedCase] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [shownFilesCaseId, setShownFilesCaseId] = useState(null);
    const [faceStyle, setFaceStyle] = useState(style.face2);
    useEffect(() => {
        if (detectiveCases.length > 0) {
            setSelectedCase(detectiveCases[0].id);
        }
    }, [detectiveCases]);

    const handleFileChange = (event, caseId) => {
        const file = event.target.files[0];
        setSelectedFiles(prevState => ({
            ...prevState,
            [caseId]: [...(prevState[caseId] || []), file]
        }));
    };


    const handleFileUpload = (caseId) => {
        const files = selectedFiles[caseId];
        if (files && files.length > 0) {
            const newFiles = files.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        localStorage.setItem(`file_${caseId}_${Date.now()}`, reader.result);
                        resolve();
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(newFiles).then(() => {
                console.log(`Uploaded files for case ID ${caseId}: `, files);
                setSelectedFiles(prevState => {
                    const newState = { ...prevState };
                    delete newState[caseId]; // Удаление файлов после загрузки
                    return newState;
                });
            }).catch(error => {
                console.error('Error uploading files:', error);
            });
        } else {
            console.log('No files selected.');
        }
    };

    const handleDeleteFile = (caseId, fileId) => {
        localStorage.removeItem(`file_${caseId}_${fileId}`);
        console.log(`Deleted file with ID ${fileId} for case ID ${caseId}`);
    };
    const showFiles = (caseId) => {
        setShownFilesCaseId(caseId);
        console.log(caseId);
    };


    return (
        <div className={style.myCasesDetective}>
            <h2>Detective's Cases</h2>
            <div className={style.detectiveCases}>
                {detectiveCases.map((caseItem) => (
                    <div key={caseItem.id} className={style.card}>
                        <div className={`${style.face} ${style.face1}`}>
                            <div className={style.content}>
                                <h3>{caseItem.name}</h3>
                            </div>
                        </div>
                        <div className={`${style.face} ${style.face2}`}>
                            <div className={style.content}>
                                <p style={{ color: caseItem.status === 'ongoing' ? 'green' : caseItem.status === 'done' ? 'red' : 'black' }}>Status: {caseItem.status}</p>
                                <p className={style.description}>Description: {caseItem.description}</p>
                                <button onClick={() => showFiles(caseItem.id)}>Files</button>
                                <div className={style.line}></div>
                                <div>
                                    {shownFilesCaseId === caseItem.id && ( // Показываем файлы только для выбранного дела
                                        <div className={style.filesForDetectiveCase}>
                                            <input type="file" onChange={(event) => handleFileChange(event, caseItem.id)} />
                                            <button onClick={() => handleFileUpload(caseItem.id)}>Upload Files</button>
                                            <div className={style.line}></div>
                                            <h4>Uploaded Files:</h4>
                                            <ul>
                                                {(selectedFiles[caseItem.id] || []).map((file, index) => (
                                                    <li key={index}>
                                                        {file.name} - {file.size} bytes
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className={style.listOfFiles}>
                                                {Object.keys(localStorage).filter(key => key.startsWith(`file_${caseItem.id}`)).map(key => (
                                                    <li key={key}>
                                                        <a href={localStorage.getItem(key)} download={`file_${key.split('_').pop()}`}>
                                                            File {key.split('_').pop()}
                                                        </a>
                                                        <button onClick={() => handleDeleteFile(caseItem.id, key.split('_').pop())}>Delete</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetectiveCases;
