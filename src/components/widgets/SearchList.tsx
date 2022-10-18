
export const SearchList = ({ merchantList }: { merchantList: string[] }) => {



  return (
    <ul className="flex flex-col justify-center w-full">
      {merchantList.map(merchant => {
        // TODO: Would be nice to have a small logo for each of the merchants when searching...
        return (
          <li>
            {merchant}
          </li>
        )
      })}
    </ul>
  )

}