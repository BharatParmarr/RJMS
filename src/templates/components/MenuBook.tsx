// src/components/MenuBook.js
import { useState } from 'react';
import '../css/MenuBook.css';
import Page from './Page';

const MenuBook = () => {
    const [currentPage, setCurrentPage] = useState(0);
    type Turning_type = 'next' | 'prev' | null;
    const [turning, setTurning] = useState<Turning_type>(null);
    const pages = [
        { title: 'Appetizers', content: 'Content for Appetizers' },
        { title: 'Main Courses', content: 'Content for Main Courses' },
        { title: 'Desserts', content: 'Content for Desserts' },
        { title: 'Drinks', content: 'Content for Drinks' },
    ];

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setTurning('next');
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setTurning(null);
            }, 600); // Match this duration to your CSS animation duration
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setTurning('prev');
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setTurning(null);
            }, 600); // Match this duration to your CSS animation duration
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            backgroundColor: '#f0f0f0',
        }}>
            <div className="menu-book">
                <button onClick={prevPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <div className={`page-wrapper ${turning}`}>
                    <Page title={pages[currentPage].title} content={pages[currentPage].content} />
                </div>
                <div className={`page-wrapper ${turning ?
                    ` ${turning === 'next' ? 'next-reverse' : 'prev-reverse'}` : ''
                    } `}>
                    <Page title={'Loading'} content={'Loading content'} />
                </div>
                <div className="page-shadow"></div>
                <button onClick={nextPage} disabled={currentPage === pages.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MenuBook;
