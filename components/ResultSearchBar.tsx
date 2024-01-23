'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Combobox } from '@headlessui/react';
import { SearchManuFacturerProps } from '@/types';
import { drive, fuels, manufacturers, transmission, yearsOfProduction } from '@/constants';
import { CustomButton, CustomFilter, OffCanvas, SearchManufacturer } from '.';
import { Button, Navbar, Pagination } from 'flowbite-react';
import Modal from './Modal';
import { CarProps } from '@/types';


const SearchButton = ({ title, otherClasses }: { title: string; otherClasses: string }) => (
  <button
 
    type="submit"
    className={`items-center justify-center ml-3 hover:bg-transparent  hover:border-2 hover:border-[#8C3AFF] hover:shadow-md hover:text-[#8C3AFF] px-5 bg-[#8C3AFF] ${otherClasses} sm:flex-row md:flex-col lg:flex-row lg:py-1 text-white`}
  >
    {title}
  </button>
);

const ResultSearchBar = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
  const [query, setQuery] = useState('');
  const [model, setModel] = useState('');
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacturer.trim() === '' && model.trim() === '') {
      return alert('Please fill in the search bar');
    }

    try {
      await updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
      router.push(`/result?manufacturer=${manufacturer}`);
    } catch (error) {
      console.error('Error updating search parameters:', error);
    }
  };

  const updateSearchParams = async (model: string, manufacturer: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const searchParams = new URLSearchParams(window.location.search);

        searchParams.delete('model');

        if (manufacturer) {
          searchParams.set('manufacturer', manufacturer);
        } else {
          searchParams.delete('manufacturer');
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathname);
        resolve();
      }, 500);
    });
  };

  const filteredManufacturers = query === ''
    ? manufacturers
    : manufacturers.filter((item) => (
      item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
    ));

  return (
  <form className='hero w-full mt-5  bg-black' onSubmit={handleSearch}>
    
    <div className='w-full mx-5 gap-5 p-5 px-10 rounded-sm bg-white justify-between flex flex-wrap hero '>
    <Combobox value={manufacturer} onChange={setManuFacturer}  >
          
          <Combobox.Button className="">
            <Image
              src="/magnifying-glass.svg"
              width={30}
              height={30}
              className=""
              alt="magnifying glass"
            />
          </Combobox.Button>
          <Combobox.Input
              className="flex h-[48px] rounded-l-md max-sm:rounded-full bg-light-white outline-none cursor-text text-sm border-none"
              placeholder="City, town or postcode"
              displayValue={(manufacturer: string) => manufacturer}
              onChange={(e) => setQuery(e.target.value)}
            />
          
            
            <CustomFilter title='test1' options={drive} />
            <CustomFilter title='test1' options={fuels} />
            <CustomFilter title='test2' options={yearsOfProduction} />
            <CustomFilter title='test3' options={transmission} />
            <SearchButton title="Search" otherClasses={'rounded-md bg-[#7100C3]'} />
            <Modal/>
          

          
        
        <Combobox.Options className="absolute top-full left-10 pl-10 ml-10 z-10">
          {filteredManufacturers.map((item) => (
            <Combobox.Option
              key={item}
              value={item}
              className={({ active }) => `relative search-manufacturer__option
                  ${active ? 'rounded-md bg-[#8C3AFF] text-white ': 'text-gray-900'}`}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {item}
                  </span>
                  {selected ? (
                    <span
                      className={`absolute inset-y-0 left-5 flex items-center pl-3 ${
                        active ? 'text-white' : 'text-teal-600'
                      }`}
                    >
                    </span>
                  ) : null}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      
    </div>
    
    
    </form>
  
  );
};

export default ResultSearchBar;


