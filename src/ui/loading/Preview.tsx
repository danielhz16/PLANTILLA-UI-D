import { Box, Skeleton } from '@mui/material';

interface Props {
  loading?: boolean;
  children?: React.ReactNode;
  sx?: any;
  radius?: number;
  height?: string | number;
  width?: string | number;
  multiple?: number;
  column?: boolean;
}

export const Preview: React.FC<Props> = ({ loading = false, children, sx, radius, height, width, multiple = 1, column = false }) => {
  return (
    <>
      {
        loading && (
          <Box sx={{ display: 'flex', flexDirection: column ? 'column' : 'row', ...sx, gap: 2 }}>
            {Array.from({ length: multiple }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={width ?? 200}
                height={height}
                sx={{
                  borderRadius: radius,
                  ...sx,
                  backgroundColor: 'var(--color-border)',
                }}
              />
            ))}
          </Box>
        )
      }
      {
        !loading && children
      }
    </>
  );
};


export default Preview;
