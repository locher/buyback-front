/**
 *
 * @export
 * @interface CarouselItem
 */
export interface CarouselItem {
  /**
   *
   * @type {string}
   * @memberof CarouselItem
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof CarouselItem
   */
  text?: string;
  /**
   *
   * @type {string}
   * @memberof CarouselItem
   */
  link?: string;
  /**
   *
   * @type {number | string}
   * @memberof CarouselItem
   */
  amount?: number | string;

  /**
   * @type {string}
   * @memberof CarouselItem
   */
  urlImage?: string;
}
