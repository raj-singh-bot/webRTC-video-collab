class WebRTCSerice {
    _peer;
  
    constructor() {
      this._peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:global.stun.twilio.com:3478',
            ],
          },
          {
            urls: 'turn:turn.p2pshare.tech:3478',
            username: 'admin',
            credential: 'admin1',
          },
        ],
      })
    }
  }

  class PeerService {
    _webRtc;
    myDataChanel
    remoteDataChanel
    remoteSocketId
  
    init() {
      if (!this._webRtc) {
        this._webRtc = new WebRTCSerice()
        this.myDataChanel = this.peer?.createDataChannel(
          `file-transfer-${Date.now()}`
        )
        return this
      }
    }
  
    async setRemoteDesc(offer) {
      console.log('Setting remote desc')
      if (this._webRtc) {
        console.log('Setting remote desc')
        return await this._webRtc._peer.setRemoteDescription(
          new RTCSessionDescription(offer)
        )
      }
    }
  
    async getAnswer(offer) {
      if (this._webRtc) {
        await this._webRtc._peer.setRemoteDescription(
          new RTCSessionDescription(offer)
        )
        const answer = await this._webRtc._peer.createAnswer()
        await this._webRtc._peer.setLocalDescription(
          new RTCSessionDescription(answer)
        )
        return answer
      }
    }
  
    async getOffer() {
      if (this._webRtc) {
        const offer = await this._webRtc._peer.createOffer()
        await this._webRtc._peer.setLocalDescription(
          new RTCSessionDescription(offer)
        )
        return offer
      }
    }
  
    get peer() {
      return this._webRtc?._peer
    }
  }
  
  export default new PeerService()
  