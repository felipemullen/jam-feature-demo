import { Dispatch, SetStateAction } from 'react';

export type TabTypes = 'demo' | 'motivation' | 'implementation';

export interface TabBarProps {
    currentTab: TabTypes;
    setCurrentTab: Dispatch<SetStateAction<TabTypes>>
}

export function TabBar({ currentTab, setCurrentTab }: TabBarProps) {

    const tabs: { label: string, value: TabTypes }[] = [
        { label: 'Demo', value: 'demo' },
        { label: 'Motivation', value: 'motivation' },
        { label: 'Implementation', value: 'implementation' }
    ];

    return (
        <ul className="flex flex-wrap justify-end text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            {tabs.map(tab =>
                <li key={tab.value} className="me-2">
                    <a href="#" className={`inline-block p-4 ${currentTab === tab.value ? 'active text-blue-600 bg-gray-50' : 'hover:bg-gray-50'}`} onClick={() => setCurrentTab(tab.value)}>
                        {tab.label}
                    </a>
                </li>
            )}
        </ul>
    );
}