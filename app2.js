let video, c_out, ctx_out, c_tmp, ctx_tmp;
function init() {

    video = document.getElementById("video");
    c_out = document.getElementById("output-canvas");
    ctx_out = c_out.getContext("2d");

    c_tmp = document.createElement("canvas");
    
    c_tmp.setAttribute("width", 1920);
    c_tmp.setAttribute("height", 1080);
    ctx_tmp = c_tmp.getContext("2d");
    video.addEventListener("play", computeFrame);
}
function computeFrame(){
    ctx_tmp.drawImage(video,0,0,video.videoWidth, video.videoHeight);
    let frame = ctx_tmp.getImageData(0,0,video.videoWidth,video.videoHeight);

    let l = frame.data.length / 4;

        for(let i=0; i < l; i++){
            
            let r =frame.data[i * 4 +0];
            let g =frame.data[i * 4 +1];
            let b =frame.data[i * 4 +2];
            if (g >= 140 && g <= 220 && r < 130) frame.data[i*4 +3] = 0;
        }

    ctx_out.putImageData(frame,0,0);
    setTimeout(computeFrame,0);
}
document.addEventListener("DOMContentLoaded",() => {
    init();
})