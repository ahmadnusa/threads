import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../ui/button'

interface Props {
  id: string
  name: string
  username: string
  imgUrl: string
  personType: string
}

export default function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const isCommunity = personType === 'Community'
  return (
    <section className="user-card">
      <div className="user-card_avatar">
        <div className="relative">
          <Image
            src={imgUrl}
            alt="user-logo"
            height={44}
            width={44}
            className="rounded-full object-cover h-[44px]"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button className="user-card_btn">
        <Link href={isCommunity ? `/communities/${id}` : `/profile/${id}`}>View</Link>
      </Button>
    </section>
  )
}
