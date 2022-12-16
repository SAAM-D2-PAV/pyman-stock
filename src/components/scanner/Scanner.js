import React, { useCallback, useLayoutEffect,useState,useEffect,useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Quagga from '@ericblade/quagga2';
import axios from 'axios';

import AuthContext from '../../context/AuthProvider';
import { setEquipmentToTask } from '../../utils/functions';

function getMedian(arr) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
        return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
    const medianOfErrors = getMedian(errors);
    return medianOfErrors;
}
 //Modification du composant 
     
const defaultConstraints = {
    width: 360,
    height: 1080
    ,
};

const defaultLocatorSettings = {
    patchSize: 'small',
    halfSample: true,
};

const defaultDecoders = [
    'code_39_reader',
    'code_39_vin_reader',
    'codabar_reader'
];


   
const Scanner = ({
    onDetected,
    scannerRef,
    onScannerReady,
    cameraId,
    facingMode,
    constraints = defaultConstraints,
    locator = defaultLocatorSettings,
    numOfWorkers = navigator.hardwareConcurrency || 0,
    decoders = defaultDecoders,
    locate = true,
}) => {
    //********************ME************************ */
   //Variable initialement vide se remplie si le champs texte est modifié (recherche)
   const [inputSearch, setInputSearch] = useState(null);
   //Headers en-tête HTTP Authorization
   const auth = useContext(AuthContext);
   //Gerstion des erreurs
   const [errMsg, setErrMsg] = useState('');
   const errRef = useRef();
    //Variable equipmentData (tableau vide) -> récupération du matériel récupérée par axios
    const [equipmentsData,setEquipmentsData] = useState(null);
    const {id} = useParams();
   //Fin des variables additionnelles
    //Requète vers API
   const getEquipments = () => {
    axios
    //On récupère les equipements
    .get(process.env.REACT_APP_URL+'api/equipment?identificationCode=' + inputSearch, {headers: {'Authorization': 'Bearer '+auth.auth.accessToken}})
    .catch(
        function (error) {
            if (error.response) {

                setErrMsg(error.response.data.message);
                errRef.current.focus();
              
            } 
          }
        )
    //Puis on les charge dans equipmentsData via setEquipmentsData
    .then((res)=>setEquipmentsData(res.data['hydra:member']));
    //.then(console.log(inputSearch))
   }
   //Ici on  relance grace au callBack quand inputSearch est modifié
   useEffect( 
    () => getEquipments(),[inputSearch],
   )
    //Ici on envoi le matériel selectionné vers le serveur lorsqu'un équipement est selectionné
    useEffect( () => {

        if(equipmentsData){
            //console.log(id);
            // ici on envoie le matériel vers la tache via function.js et setEquipmentToTask
            equipmentsData.map(
               (e) => setEquipmentToTask("addEq_ToTask",Number(id),e.id,auth)
           )
        }
     },[equipmentsData])
    //******************************************** */



    const errorCheck = useCallback((result) => {
        if (!onDetected) {
            return;
        }
        const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
        // if Quagga is at least 75% certain that it read correctly, then accept the code.
        if (err < 0.25) {
            onDetected(result.codeResult.code);
        }
    }, [onDetected]);

    const handleProcessed = (result) => {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;
        drawingCtx.font = "24px Arial";
        drawingCtx.fillStyle = 'green';

        if (result) {
            // console.warn('* quagga onProcessed', result);
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
                result.boxes.filter((box) => box !== result.box).forEach((box) => {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'purple', lineWidth: 2 });
                });
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'red', lineWidth: 2 });
            }
            if (result.codeResult && result.codeResult.code) {
               //***************ME***************************** */
                    setInputSearch(result.codeResult.code);
                //******************************************** */
                
                 //const validated = barcodeValidator(result.codeResult.code);
                // const validated = validateBarcode(result.codeResult.code);
                // Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: validated ? 'green' : 'red', lineWidth: 3 });
                drawingCtx.font = "24px Arial";
                // drawingCtx.fillStyle = validated ? 'green' : 'red';
                // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
                drawingCtx.fillText(result.codeResult.code, 10, 20);
                // if (validated) {
                //     onDetected(result);
                // }
            }
        }
    };

    useLayoutEffect(() => {
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    ...constraints,
                    ...(cameraId && { deviceId: cameraId }),
                    ...(!cameraId && { facingMode }),
                },
                target: scannerRef.current,
            },
            locator,
            numOfWorkers,
            decoder: { readers: decoders },
            locate,
        }, (err) => {
            Quagga.onProcessed(handleProcessed);

            if (err) {
                
            }
            if (scannerRef && scannerRef.current) {
                Quagga.start();
                if (onScannerReady) {
                    onScannerReady();
                }
            }
        });
        Quagga.onDetected(errorCheck);
        return () => {
            Quagga.offDetected(errorCheck);
            Quagga.offProcessed(handleProcessed);
            Quagga.stop();
        };
    }, [cameraId, onDetected, onScannerReady, scannerRef, errorCheck, constraints, locator, decoders, locate]);
    return null;
}

Scanner.propTypes = {
    onDetected: PropTypes.func.isRequired,
    scannerRef: PropTypes.object.isRequired,
    onScannerReady: PropTypes.func,
    cameraId: PropTypes.string,
    facingMode: PropTypes.string,
    constraints: PropTypes.object,
    locator: PropTypes.object,
    numOfWorkers: PropTypes.number,
    decoders: PropTypes.array,
    locate: PropTypes.bool,
};

export default Scanner;
