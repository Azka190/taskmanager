declare module "aos" {
    export interface AosOptions {
      offset?: number;
      delay?: number;
      duration?: number;
      easing?: string;
      once?: boolean;
      mirror?: boolean;
      anchorPlacement?: string;
    }
  
    export function init(options?: AosOptions): void;
    export function refresh(): void;
  
    const AOS: {
      init(options?: AosOptions): void;
      refresh(): void;
    };
  
    export default AOS;
  }
  