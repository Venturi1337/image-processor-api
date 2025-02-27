export interface ImageSourcePort {
  getImageBuffer(inputPath: string): Promise<Buffer>;
}
