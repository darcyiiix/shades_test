import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Category = () => {
    return (
        <>
            <div className="container mx-auto pt-10 pb-24 max-sm:pb-10 px-24 max-lg:px-2 max-[980px]:pt-0 max-md:pt-2 max-[600px]:-mt-8 max-[420px]:-mt-16" >
                <h2 className="text-center text-2xl max-sm:text-lg uppercase mb-20 max-sm:mb-10">Explore our products</h2>
        
                <div className="-m-1 flex flex-wrap md:-m-2 max-sm:block text-2xl max-md:text-lg">
                    <div className="flex w-1/2 flex-wrap max-sm:w-full">
                        <div className="w-1/2 p-1 md:p-2">
                            <a href="#" className="relative">
                                <LazyLoadImage
                                    alt="gallery"
                                    className="block h-full w-full object-cover object-center"
                                    src="images/categories/rec_image_1.jpeg"
                                    effect="blur"
                                />
                                <div className="absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                        
                            </a>
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                            <a href="#" className="relative">
                                <LazyLoadImage
                                    alt="gallery"
                                    className="block h-full w-full object-cover object-center"
                                    src="images/categories/rec_image_2.jpeg"
                                    effect="blur"
                                />
                                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                                
                            </a>
                        </div>
                        <div className="w-full p-1 md:p-2">
                            <a href="#" className="relative">
                                <LazyLoadImage
                                    alt="gallery"
                                    className="block h-full w-full object-cover object-center"
                                    src="/images/categories/rec_image_3.jpeg"
                                    effect="blur"
                                />
                                <div className="absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                                
                            </a>
                        </div>
                    </div>

                    <div className="flex w-1/2 flex-wrap max-sm:w-full max-sm:mt-8">
                        <div className="w-full p-1 md:p-2">
                            <a href="#" className="relative">
                                <LazyLoadImage
                                    alt="gallery"
                                    className="block h-full w-full object-cover object-center"
                                    src="images/categories/rec_image_4.jpeg"
                                    effect="blur"
                                />
                                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                                <p className="absolute bottom-1 left-2 text-white">lamp shades</p>
                            </a>
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                            <a href="#" className="relative">
                                <LazyLoadImage
                                    alt="gallery"
                                    className="block h-full w-full object-cover object-center"
                                    src="images/categories/rec_image_5.jpeg"
                                    effect="blur"
                                />
                                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                                
                            </a>
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                            <a href="#" className="relative">
                                <LazyLoadImage
                                    alt="gallery"
                                    className="block h-full w-full object-cover object-center"
                                    src="images/categories/rec_image_6.jpeg"
                                    effect="blur"
                                />
                                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                               
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
