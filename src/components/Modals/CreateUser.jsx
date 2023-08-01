import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { BsPersonFillAdd } from 'react-icons/bs'
import { registerService } from '@/services/userServices'

export default function CreateUserModal({ setModalOpen, ModalOpen, getusers }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [username, setUsername] = useState()

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    setOpen(ModalOpen)
  }, [ModalOpen])

  async function handleCreateUser() {
    const payload = {
      email,
      username,
      password,
      first_name: firstname,
      last_name: lastname,
    }

    const { data, status } = await registerService(payload)
    setModalOpen(false)

    getusers()

    console.log(data)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="x relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                <div className="bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 sm:mx-0 sm:h-10 sm:w-10">
                      <BsPersonFillAdd className="h-[20px] w-[20px] text-blue-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Create Users
                      </Dialog.Title>
                      <p className="text-sm">
                        Fill the requirments inputs to create a new user
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" px-10">
                  <input
                    onChange={(e) => setFirstname(e.currentTarget.value)}
                    className="text-white-p mt-4 h-[40px] w-full border-b border-[#515152] bg-transparent outline-none placeholder:text-gray-500 focus:border-blue-600"
                    placeholder="Firstname"
                  ></input>
                  <input
                    onChange={(e) => setLastname(e.currentTarget.value)}
                    className="text-white-p mt-4 h-[40px] w-full border-b border-[#515152] bg-transparent outline-none placeholder:text-gray-500 focus:border-blue-600"
                    placeholder="Lastname"
                  ></input>
                  <input
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    className="text-white-p mt-4 h-[40px] w-full border-b border-[#515152] bg-transparent outline-none placeholder:text-gray-500 focus:border-blue-600"
                    placeholder="Username"
                  ></input>
                  <input
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    className="text-white-p mt-4 h-[40px] w-full border-b border-[#515152] bg-transparent outline-none placeholder:text-gray-500 focus:border-blue-600"
                    placeholder="Email"
                  ></input>
                  <input
                    type={'password'}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    className="text-white-p mt-4 h-[40px] w-full border-b border-[#515152] bg-transparent outline-none placeholder:text-gray-500 focus:border-blue-600"
                    placeholder="Password"
                  ></input>
                </div>
                <div className="mt-10 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={handleCreateUser}
                  >
                    Create user
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
