import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const isDetailPage = location.pathname.startsWith('/character/');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024 && !isDetailPage) {
                setIsSidebarOpen(true);
            } else if (window.innerWidth >= 1024) {
                setIsSidebarOpen(false);
            }
        };

        // Run once on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isDetailPage]);

    return (
        <div className="flex h-screen bg-[#FFFFFF] text-[#111111] w-full overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">


                <div className="flex-1 overflow-y-auto">
                    <div className="h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppLayout;
