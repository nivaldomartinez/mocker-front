import { Menu, Transition } from '@headlessui/react'
import { Fragment, type FunctionComponent } from 'react'

const ErrorCodeDropdown: FunctionComponent<{
    options: {statusCode: number; description: string}[]
    children: React.ReactNode
    onSelect: (selected: {statusCode: number; description: string}) => void
}> = ({ options, children, onSelect }) => {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button>
                        {children}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 mt-2 w-64 max-h-96 overflow-y-scroll origin-top-right divide-y z-10 divide-gray-100 rounded-md bg-purple-100 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {options.map(option => (
                                <Menu.Item key={option.description}>
                                {({ active }) => (
                                    <button
                                    onClick={() => onSelect(option)}
                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                            } w-full rounded-md px-2 py-2 text-sm text-left`}
                                    >
                                        <span className="font-bold">{option.statusCode}</span>
                                        <span>({option.description})</span> 
                                    </button>
                                )}
                            </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default ErrorCodeDropdown
