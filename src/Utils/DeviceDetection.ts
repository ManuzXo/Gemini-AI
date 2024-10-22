class DeviceDetection{
    private static m_userAgent: string = navigator.userAgent;

    private static isMobileDevice = (): boolean => {
      const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
      return regexs.some((b) => this.m_userAgent.match(b))
    }
    
    private static isTabletDevice = (): boolean => {
      const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
      return regex.test(this.m_userAgent.toLowerCase())
    }
    
    public static isDesktopDevice = (): boolean => !this.isMobileDevice() && !this.isTabletDevice()
}
export default DeviceDetection;