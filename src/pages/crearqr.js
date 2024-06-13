import React, { useState, useRef, useEffect } from "react";
import Seo from "../components/seo";
import Halt from "../components/header/halt";
import MyComponent from "../components/comp/comp";
import QRCode from 'qrcode.react';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import download from 'downloadjs';
import "../components/css-pages/crearqr.css";
import Desplegable from '../components/desplegable/Desplegable';
import Footer from "../components/footer/Footer";
import BtnSave from "../components/buttons/BtnSave";
import BtnDownload from "../components/buttons/BtnDownload";
import BtnUp from "../components/buttons/BtnUp";
import BtnInfo from "../components/buttons/BtnInfo";
import MapComponent from "../components/mapa/mapa";

function Crearqr() {
  const [qrColor, setQrColor] = useState('black');
  const [qrSize, setQrSize] = useState(100);
  const [qrName, setQrName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const qrRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState("")

  const handleColorChange = (color) => {
    setQrColor(color);
  };
  const handleSizeChange = (size) => {
    setQrSize(parseInt(size, 10));
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleDownload = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      download(dataUrl, 'qr-code.png');
    }
  };
  const handleDownload2 = async () => {
    if (qrRef.current) {
      const dataUrl = await toJpeg(qrRef.current);
      download(dataUrl, 'qr-code.jpeg');
    }
  };
  const handleDownload3 = async () => {
    if (qrRef.current) {
      const dataUrl = await toSvg(qrRef.current);
      download(dataUrl, 'qr-code.svg');
    }
  };

  const colorOptions = ['black', 'blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink', 'magenta'];

  const options = [
    { value: "default", label: "Selecciona el contenido", disabled: true },
    { value: 'url', label: 'URL', disabled: false },
    { value: 'geolocation', label: 'Geolocalización', disabled: false },
    { value: 'image', label: 'Imagen', disabled: false },
    { value: 'text', label: 'Texto Explicativo', disabled: false },
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const opcion = (event) => {
    setSelectedOption(event.target.value);
    setInputValue('');
    console.log('Selected:', event.target.value);
  };

  const handleLocationSelect = latlng => {
    // Genera la URL de Google Maps con las coordenadas seleccionadas
    const mapsUrl = `https://www.google.com/maps?q=${latlng.lat},${latlng.lng}`
    setInputValue(mapsUrl)
    setDisplayValue(`${latlng.lat}, ${latlng.lng}`)
  }

  let inputType = 'textarea';
  let inputPlaceholder = 'Introduce tu texto o url aquí:';
  let inputPattern = '';

  switch (selectedOption) {
    case 'url':
      inputType = 'url';
      inputPlaceholder = 'Introduce la URL aquí:';
      inputPattern = 'https?://.*';
      break;
      case "geolocation":
        inputType = "hidden"
        inputPlaceholder = "Selecciona un punto en el mapa:"
        inputPattern = "^(-?\\d+(\\.\\d+)?),\\s*(-?\\d+(\\.\\d+)?)$"
        break;
    case 'image':
      inputType = 'file';
      inputPlaceholder = 'Selecciona una imagen:';
      inputPattern = '';
      break;
    case 'text':
      inputType = 'text';
      inputPlaceholder = 'Introduce el texto aquí:';
      inputPattern = '';
      break;
    default:
      inputType = 'text';
      inputPlaceholder = 'Introduce tu texto o url aquí:';
      inputPattern = '';
  }

  return (
    <>
      <Halt />
      <div className="container">
        <section className="layout">
          <div className="contenido">
            <div className="patata">
              <div className="flex-container">
                <BtnInfo className="info ambos" />
                <h2 className="ambos h2h2">CONTENIDO DEL QR:</h2>
              </div>
              <label htmlFor="nombreQR">Introduce el nombre de tu QR</label>
              <textarea type="text" id="nombreQR" placeholder="Introduce el nombre del QR" onChange={(e) => setQrName(e.target.value)} />
              <label>Elija el tipo de Contenido:</label>
              <Desplegable options={options} onChange={opcion} />
              <label htmlFor="tipo">{inputPlaceholder}</label>
              {selectedOption === 'geolocation' ? (
                <div className="mapa">
                <MapComponent onLocationSelect={handleLocationSelect} />
                </div>
              ) : (
                inputType === 'file' ? (
                  <input
                    id="tipo"
                    type={inputType}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="holaa"
                  />
                ) : (
                  <textarea
                    id="tipo"
                    type={inputType}
                    value={inputValue}
                    onChange={handleInputChange}
                    pattern={inputPattern}
                  />
                )
              )}
            </div>
            <div className="personalizar">
              <h2>PERSONALIZAR QR:</h2>
              <MyComponent
                onColorChange={handleColorChange}
                onSizeChange={handleSizeChange}
                colorOptions={colorOptions}
              />
            </div>
          </div>
          <div className="visualizacion">
            <h2>VISUALIZACIÓN QR:</h2>
            <div className="qr-contenido">
              <div ref={qrRef}>
                <QRCode value={inputValue} size={qrSize} fgColor={qrColor} className="qrimg" />
              </div>
              <br />
              <p className="name">Nombre del QR:<br /> {qrName}</p>
              <br />
              <div className="contenido2">
                <p>Contenido del QR:</p>
                <p>
                  {selectedOption === "geolocation" ? displayValue : inputValue}
                </p>
                <br />
              </div>
              <BtnSave />
              <br />
              <BtnDownload
                handleDownload={handleDownload}
                handleDownload2={handleDownload2}
                handleDownload3={handleDownload3}
              />
            </div>
          </div>
        </section>
        <br />
        <br />
      </div>
      <BtnUp />
      <Footer />
    </>
  );
}

export const Head = () => <Seo title="Crear Qr" />;
export default Crearqr;