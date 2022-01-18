const getColor = (color: string) => {
    switch (color) {
        case 'green':
            color = '#5cb85c'
            break;
        case 'purple':
            color = '#A100E1'
            break;
        case 'pink':
            color = '#ff748c'
            break;
        case 'grey':
            color = '#292b2c'
            break;
        case 'red':
            color = '#d9534f'
            break;
        case 'orange':
            color = '#ffa500'
            break;
    }
    return color;
}

export default getColor;