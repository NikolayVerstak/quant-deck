export const JsonView = (data: any) => {
    if (process.env.NODE_ENV === 'production') return null

    return (
        <pre className="text-xs max-h-[400px] overflow-x-auto col-span-full overflow-y-auto bg-muted p-2 font-mono">
            <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
    )
}
