(function(){
    const debug = false, root = this;
    function EXIF(obj){ if(obj instanceof EXIF) return obj; if(!(this instanceof EXIF)) return new EXIF(obj); this.wrapped = obj; }
    if(typeof exports !== "undefined"){
    if(typeof module !== "undefined" && module.exports)
    exports = module.exports = EXIF;
    exports.EXIF = EXIF;
    } else { root.EXIF = EXIF; }
    const ExifTags = EXIF.Tags = {
    0x9000:"ExifVersion",0xa000:"FlashpixVersion",0xa001:"ColorSpace",0xa002:"PixelXDimension",0xa003:"PixelYDimension",0x9101:"ComponentsConfiguration",
    0x9102:"CompressedBitsPerPixel",0x927c:"MakerNote",0x9286:"UserComment",0xa004:"RelatedSoundFile",0x9003:"DateTimeOriginal",0x9004:"DateTimeDigitized",
    0x9290:"SubsecTime",0x9291:"SubsecTimeOriginal",0x9292:"SubsecTimeDigitized",0x829a:"ExposureTime",0x829d:"FNumber",0x8822:"ExposureProgram",
    0x8824:"SpectralSensitivity",0x8827:"ISOSpeedRatings",0x8828:"OECF",0x9201:"ShutterSpeedValue",0x9202:"ApertureValue",0x9203:"BrightnessValue",
    0x9204:"ExposureBias",0x9205:"MaxApertureValue",0x9206:"SubjectDistance",0x9207:"MeteringMode",0x9208:"LightSource",0x9209:"Flash",
    0x9214:"SubjectArea",0x920a:"FocalLength",0xa20b:"FlashEnergy",0xa20c:"SpatialFrequencyResponse",0xa20e:"FocalPlaneXResolution",0xa20f:"FocalPlaneYResolution",
    0xa210:"FocalPlaneResolutionUnit",0xa214:"SubjectLocation",0xa215:"ExposureIndex",0xa217:"SensingMethod",0xa300:"FileSource",0xa301:"SceneType",
    0xa302:"CFAPattern",0xa401:"CustomRendered",0xa402:"ExposureMode",0xa403:"WhiteBalance",0xa404:"DigitalZoomRation",0xa405:"FocalLengthIn35mmFilm",
    0xa406:"SceneCaptureType",0xa407:"GainControl",0xa408:"Contrast",0xa409:"Saturation",0xa40a:"Sharpness",0xa40b:"DeviceSettingDescription",
    0xa40c:"SubjectDistanceRange",0xa005:"InteroperabilityIFDPointer",0xa420:"ImageUniqueID"
    };
    const TiffTags = EXIF.TiffTags = {
    0x0100:"ImageWidth",0x0101:"ImageHeight",0x8769:"ExifIFDPointer",0x8825:"GPSInfoIFDPointer",0xa005:"InteroperabilityIFDPointer",0x0102:"BitsPerSample",
    0x0103:"Compression",0x0106:"PhotometricInterpretation",0x0112:"Orientation",0x0115:"SamplesPerPixel",0x011c:"PlanarConfiguration",0x0212:"YCbCrSubSampling",
    0x0213:"YCbCrPositioning",0x011a:"XResolution",0x011b:"YResolution",0x0128:"ResolutionUnit",0x0111:"StripOffsets",0x0116:"RowsPerStrip",
    0x0117:"StripByteCounts",0x0201:"JPEGInterchangeFormat",0x0202:"JPEGInterchangeFormatLength",0x012d:"TransferFunction",0x013e:"WhitePoint",
    0x013f:"PrimaryChromaticities",0x0211:"YCbCrCoefficients",0x0214:"ReferenceBlackWhite",0x0132:"DateTime",0x010e:"ImageDescription",0x010f:"Make",
    0x0110:"Model",0x0131:"Software",0x013b:"Artist",0x8298:"Copyright"
    };
    const GPSTags = EXIF.GPSTags = {
    0x0000:"GPSVersionID",0x0001:"GPSLatitudeRef",0x0002:"GPSLatitude",0x0003:"GPSLongitudeRef",0x0004:"GPSLongitude",0x0005:"GPSAltitudeRef",
    0x0006:"GPSAltitude",0x0007:"GPSTimeStamp",0x0008:"GPSSatellites",0x0009:"GPSStatus",0x000a:"GPSMeasureMode",0x000b:"GPSDOP",
    0x000c:"GPSSpeedRef",0x000d:"GPSSpeed",0x000e:"GPSTrackRef",0x000f:"GPSTrack",0x0010:"GPSImgDirectionRef",0x0011:"GPSImgDirection",
    0x0012:"GPSMapDatum",0x0013:"GPSDestLatitudeRef",0x0014:"GPSDestLatitude",0x0015:"GPSDestLongitudeRef",0x0016:"GPSDestLongitude",
    0x0017:"GPSDestBearingRef",0x0018:"GPSDestBearing",0x0019:"GPSDestDistanceRef",0x001a:"GPSDestDistance",0x001b:"GPSProcessingMethod",
    0x001c:"GPSAreaInformation",0x001d:"GPSDateStamp",0x001e:"GPSDifferential"
    };
    const StringValues = EXIF.StringValues = {
    ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},
    MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},
    LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},
    Flash:{0x0000:"Flash did not fire",0x0001:"Flash fired",0x0005:"Strobe return light not detected",0x0007:"Strobe return light detected",0x0009:"Flash fired, compulsory flash mode",0x000d:"Flash fired, compulsory flash mode, return light not detected",0x000f:"Flash fired, compulsory flash mode, return light detected",0x0010:"Flash did not fire, compulsory flash mode",0x0018:"Flash did not fire, auto mode",0x0019:"Flash fired, auto mode",0x001d:"Flash fired, auto mode, return light not detected",0x001f:"Flash fired, auto mode, return light detected",0x0020:"No flash function",0x0041:"Flash fired, red-eye reduction mode",0x0045:"Flash fired, red-eye reduction mode, return light not detected",0x0047:"Flash fired, red-eye reduction mode, return light detected",0x0049:"Flash fired, compulsory flash mode, red-eye reduction mode",0x004d:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",0x004f:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",0x0059:"Flash fired, auto mode, red-eye reduction mode",0x005d:"Flash fired, auto mode, return light not detected, red-eye reduction mode",0x005f:"Flash fired, auto mode, return light detected, red-eye reduction mode"},
    SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},
    SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},
    SceneType:{1:"Directly photographed"},
    CustomRendered:{0:"Normal process",1:"Custom process"},
    WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},
    GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},
    Contrast:{0:"Normal",1:"Soft",2:"Hard"},
    Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},
    Sharpness:{0:"Normal",1:"Soft",2:"Hard"},
    SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},
    FileSource:{3:"DSC"},
    Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}
    };
    const addEvent = (el, evt, handler) => el.addEventListener ? el.addEventListener(evt, handler) : el.attachEvent("on"+evt, handler);
    const imageHasData = img => !!img.exifdata;
    const base64ToArrayBuffer = (b64, ct) => {
    ct = ct || b64.match(/^data\:([^\;]+)\;base64,/im)[1] || "";
    b64 = b64.replace(/^data\:([^\;]+)\;base64,/gim, "");
    const binary = atob(b64), len = binary.length, buffer = new ArrayBuffer(len), view = new Uint8Array(buffer);
    for(let i = 0; i < len; i++) view[i] = binary.charCodeAt(i);
    return buffer;
    };
    const objectURLToBlob = (url, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => { if(xhr.status === 200 || xhr.status === 0) cb(xhr.response); };
    xhr.send();
    };
    function getImageData(img, cb) {
    const handleBinary = bin => {
    const data = findEXIFinJPEG(bin), iptc = findIPTCinJPEG(bin);
    img.exifdata = data || {};
    img.iptcdata = iptc || {};
    cb && cb.call(img);
    };
    if(img instanceof Image || img instanceof HTMLImageElement) {
    if(/^data\:/i.test(img.src)) handleBinary(base64ToArrayBuffer(img.src));
    else if(/^blob\:/i.test(img.src)) {
    const fr = new FileReader();
    fr.onload = e => handleBinary(e.target.result);
    objectURLToBlob(img.src, blob => fr.readAsArrayBuffer(blob));
    } else {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => { if(xhr.status == "200") handleBinary(xhr.response); else throw "Could not load image"; };
    xhr.open("GET", img.src, true);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    }
    } else if(window.FileReader && (img instanceof Blob || img instanceof File)) {
    const fr = new FileReader();
    fr.onload = e => handleBinary(e.target.result);
    fr.readAsArrayBuffer(img);
    }
    }
    function findEXIFinJPEG(file) {
    const dv = new DataView(file);
    if(dv.getUint8(0) != 0xff || dv.getUint8(1) != 0xd8) return false;
    let offset = 2, length = file.byteLength, marker;
    while(offset < length) {
    if(dv.getUint8(offset) != 0xff) return false;
    marker = dv.getUint8(offset + 1);
    if(marker === 225) return readEXIFData(dv, offset + 4, dv.getUint16(offset + 2) - 2);
    offset += 2 + dv.getUint16(offset + 2);
    }
    }
    function findIPTCinJPEG(file) {
    const dv = new DataView(file);
    if(dv.getUint8(0) != 0xff || dv.getUint8(1) != 0xd8) return false;
    let offset = 2, length = file.byteLength;
    const isFieldStart = (dv, offset) => dv.getUint8(offset) === 0x38 && dv.getUint8(offset+1) === 0x42 && dv.getUint8(offset+2) === 0x49 && dv.getUint8(offset+3) === 0x4d && dv.getUint8(offset+4) === 0x04 && dv.getUint8(offset+5) === 0x04;
    while(offset < length) {
    if(isFieldStart(dv, offset)) {
    let nameLen = dv.getUint8(offset+7);
    if(nameLen % 2 !== 0) nameLen++;
    if(nameLen === 0) nameLen = 4;
    const startOffset = offset + 8 + nameLen, sectionLength = dv.getUint16(offset+6+nameLen);
    return readIPTCData(file, startOffset, sectionLength);
    }
    offset++;
    }
    }
    const IptcFieldMap = { 0x78:"caption",0x6e:"credit",0x19:"keywords",0x37:"dateCreated",0x50:"byline",0x55:"bylineTitle",0x7a:"captionWriter",0x69:"headline",0x74:"copyright",0x0f:"category" };
    function readIPTCData(file, startOffset, sectionLength) {
    const dv = new DataView(file), data = {};
    for(let pos = startOffset; pos < startOffset + sectionLength; pos++) {
    if(dv.getUint8(pos) === 0x1c && dv.getUint8(pos+1) === 0x02) {
    const segmentType = dv.getUint8(pos+2);
    if(segmentType in IptcFieldMap) {
        let dataSize = dv.getInt16(pos+3), field = IptcFieldMap[segmentType],
        value = getStringFromDB(dv, pos+5, dataSize);
        data[field] = data.hasOwnProperty(field) ? (Array.isArray(data[field]) ? data[field].concat(value) : [data[field], value]) : value;
    }
    }
    }
    return data;
    }
    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
    const entries = file.getUint16(dirStart, !bigEnd), tags = {};
    for(let i = 0; i < entries; i++) {
    const entryOffset = dirStart + i * 12 + 2;
    const tagName = strings[file.getUint16(entryOffset, !bigEnd)];
    tags[tagName] = readTagValue(file, entryOffset, tiffStart, bigEnd);
    }
    return tags;
    }
    function readTagValue(file, entryOffset, tiffStart, bigEnd) {
    const type = file.getUint16(entryOffset + 2, !bigEnd), numValues = file.getUint32(entryOffset + 4, !bigEnd);
    const valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart;
    let offset, vals = [], n, numerator, denominator;
    switch(type) {
    case 1:
    case 7:
    if(numValues === 1) return file.getUint8(entryOffset+8, !bigEnd);
    offset = numValues > 4 ? valueOffset : entryOffset + 8;
    for(n = 0; n < numValues; n++) vals.push(file.getUint8(offset + n));
    return vals;
    case 2:
    offset = numValues > 4 ? valueOffset : entryOffset + 8;
    return getStringFromDB(file, offset, numValues - 1);
    case 3:
    if(numValues === 1) return file.getUint16(entryOffset+8, !bigEnd);
    offset = numValues > 2 ? valueOffset : entryOffset + 8;
    for(n = 0; n < numValues; n++) vals.push(file.getUint16(offset + n * 2, !bigEnd));
    return vals;
    case 4:
    if(numValues === 1) return file.getUint32(entryOffset+8, !bigEnd);
    for(n = 0; n < numValues; n++) vals.push(file.getUint32(valueOffset + n * 4, !bigEnd));
    return vals;
    case 5:
    if(numValues === 1) {
        numerator = file.getUint32(valueOffset, !bigEnd);
        denominator = file.getUint32(valueOffset+4, !bigEnd);
        let val = Number(numerator/denominator);
        val.numerator = numerator; val.denominator = denominator;
        return val;
    }
    for(n = 0; n < numValues; n++){
        numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
        denominator = file.getUint32(valueOffset + 8 * n + 4, !bigEnd);
        let val = Number(numerator/denominator);
        val.numerator = numerator; val.denominator = denominator;
        vals.push(val);
    }
    return vals;
    case 9:
    if(numValues === 1) return file.getInt32(entryOffset+8, !bigEnd);
    for(n = 0; n < numValues; n++) vals.push(file.getInt32(valueOffset + n * 4, !bigEnd));
    return vals;
    case 10:
    if(numValues === 1) return file.getInt32(valueOffset, !bigEnd)/file.getInt32(valueOffset+4, !bigEnd);
    for(n = 0; n < numValues; n++) vals.push(file.getInt32(valueOffset+n*8, !bigEnd)/file.getInt32(valueOffset+n*8+4, !bigEnd));
    return vals;
    }
    }
    function getStringFromDB(buffer, start, length) {
    let out = "";
    for(let n = start; n < start + length; n++) out += String.fromCharCode(buffer.getUint8(n));
    return out;
    }
    function readEXIFData(file, start) {
    if(getStringFromDB(file, start, 4) !== "Exif") return false;
    const tiffOffset = start + 6;
    let bigEnd = file.getUint16(tiffOffset) === 0x4949 ? false : file.getUint16(tiffOffset) === 0x4d4d ? true : null;
    if(bigEnd === null || file.getUint16(tiffOffset + 2, !bigEnd) !== 0x002a) return false;
    const firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);
    if(firstIFDOffset < 8) return false;
    let tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);
    if(tags.ExifIFDPointer) {
    const exifData = readTags(file, tiffOffset, tiffOffset+tags.ExifIFDPointer, ExifTags, bigEnd);
    for(let tag in exifData) {
    switch(tag) {
        case "LightSource":
        case "Flash":
        case "MeteringMode":
        case "ExposureProgram":
        case "SensingMethod":
        case "SceneCaptureType":
        case "SceneType":
        case "CustomRendered":
        case "WhiteBalance":
        case "GainControl":
        case "Contrast":
        case "Saturation":
        case "Sharpness":
        case "SubjectDistanceRange":
        case "FileSource":
        exifData[tag] = StringValues[tag][exifData[tag]];
        break;
        case "ExifVersion":
        case "FlashpixVersion":
        exifData[tag] = String.fromCharCode(...exifData[tag]);
        break;
        case "ComponentsConfiguration":
        exifData[tag] = StringValues.Components[exifData[tag][0]]+StringValues.Components[exifData[tag][1]]+StringValues.Components[exifData[tag][2]]+StringValues.Components[exifData[tag][3]];
        break;
    }
    tags[tag] = exifData[tag];
    }
    }
    if(tags.GPSInfoIFDPointer) {
    const gpsData = readTags(file, tiffOffset, tiffOffset+tags.GPSInfoIFDPointer, GPSTags, bigEnd);
    for(let tag in gpsData) {
    if(tag === "GPSVersionID") gpsData[tag] = gpsData[tag].join(".");
    tags[tag] = gpsData[tag];
    }
    }
    return tags;
    }
    EXIF.getData = function(img, cb) {
    if((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;
    if(!imageHasData(img)) getImageData(img, cb);
    else cb && cb.call(img);
    return true;
    };
    EXIF.getTag = (img, tag) => imageHasData(img) && img.exifdata[tag];
    EXIF.getAllTags = img => {
    if(!imageHasData(img)) return {};
    let tags = {};
    for(let a in img.exifdata) if(img.exifdata.hasOwnProperty(a)) tags[a] = img.exifdata[a];
    return tags;
    };
    EXIF.pretty = img => {
    if(!imageHasData(img)) return "";
    let str = "";
    for(let a in img.exifdata) {
    if(img.exifdata.hasOwnProperty(a)) {
    str += typeof img.exifdata[a] == "object" ?
        (img.exifdata[a] instanceof Number ? a+" : "+img.exifdata[a]+" ["+img.exifdata[a].numerator+"/"+img.exifdata[a].denominator+"]\r\n" : a+" : ["+img.exifdata[a].length+" values]\r\n")
        : a+" : "+img.exifdata[a]+"\r\n";
    }
    }
    return str;
    };
    EXIF.readFromBinaryFile = file => findEXIFinJPEG(file);
    if(typeof define === "function" && define.amd) define("exif-js", [], () => EXIF);
}).call(this);
(function(){
    const out = document.querySelector("#output"),
    url = window.URL || window.webkitURL,
    objURL = url.createObjectURL || false,
    fileinput = document.querySelector("#getfile"),
    canvas = document.querySelector("canvas"),
    cx = canvas.getContext("2d"),
    app = document.querySelector("#app");
    app.addEventListener("dragover", e => { document.body.classList.add("dragdrop"); e.preventDefault(); }, false);
    app.addEventListener("drop", getfile, false);
    fileinput.addEventListener("change", getfile, false);
    function getfile(e) {
    document.body.classList.remove("dragdrop");
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    EXIF.getData(file, function(){
    let str = "<ul>", data = EXIF.getAllTags(this);
    for(let key in data) { if(key === "MakerNote") continue; str += "<li>" + key + ": " + data[key] + "</li>"; }
    out.innerHTML = str + "</ul>";
    if(Object.keys(data).length !== 0) {
    if(objURL) loadImage(url.createObjectURL(file), file.name);
    else { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = ev => loadImage(ev.target.result, file.name); }
    } else out.innerHTML = "Image is already clean!";
    });
    e.preventDefault();
    }
    function loadImage(src, name) {
    const img = new Image();
    img.src = src;
    img.onload = () => imagetocanvas(img, img.naturalWidth, img.naturalHeight, name);
    }
    function imagetocanvas(img, w, h, name) {
    canvas.width = w;
    canvas.height = h;
    cx.drawImage(img, 0, 0, w, h);
    const dlname = name.replace(/\.([^\.]+)$/, "-cleaned.jpg");
    out.innerHTML += '<a href="'+canvas.toDataURL("image/jpeg", 0.9)+'" download="'+dlname+'" class="btn btn-hover color-2 mt-3">Download clean image</a>';
    }
})();
