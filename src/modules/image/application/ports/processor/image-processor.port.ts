export interface ImageProcessorPort {
  process(originalPath: string, outputPath: string, resolution: number): Promise<string>;
}
