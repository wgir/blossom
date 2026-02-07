import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const isDetailPage = location.pathname.startsWith('/character/');

    useEffect(() => {
        // Automatically open sidebar on mobile when navigating to the list view
        if (!isDetailPage && window.innerWidth < 1024) {
            setIsSidebarOpen(true);
        }
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
