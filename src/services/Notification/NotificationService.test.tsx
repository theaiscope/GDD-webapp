import { renderHook } from '@testing-library/react-hooks'
import * as notistack from 'notistack'
import useNotification from './NotificationService'

describe('NotificationService', () => {
  const enqueueSpy = jest.fn()

  beforeEach(() => {
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => ({
      enqueueSnackbar: enqueueSpy,
      closeSnackbar: jest.fn(),
    }))
  })

  it('should show an INFO message by default', () => {
    const {
      result: { current: notification },
    } = renderHook(() => useNotification())
    const message = 'Test info message'

    notification.showMessage(message)

    const expectedVariant = 'info'
    expect(enqueueSpy).toHaveBeenCalledWith(message, { variant: expectedVariant, action: expect.anything() })
  })

  it('should show an ERROR message', () => {
    const {
      result: { current: notification },
    } = renderHook(() => useNotification())
    const message = 'Test error message'

    notification.showErrorMessage(message)

    const expectedVariant = 'error'
    expect(enqueueSpy).toHaveBeenCalledWith(message, { variant: expectedVariant, action: expect.anything() })
  })

  it('should show an SUCCESS message', () => {
    const {
      result: { current: notification },
    } = renderHook(() => useNotification())
    const message = 'Test success message'

    notification.showSuccessMessage(message)

    const expectedVariant = 'success'
    expect(enqueueSpy).toHaveBeenCalledWith(message, { variant: expectedVariant, action: expect.anything() })
  })

  it('should show a message with the specified type', () => {
    const {
      result: { current: notification },
    } = renderHook(() => useNotification())
    const message = 'Test message'
    const type = 'warning'

    notification.showMessage(message, type)

    expect(enqueueSpy).toHaveBeenCalledWith(message, { variant: type, action: expect.anything() })
  })

  it('should show a message without the close button', () => {
    const {
      result: { current: notification },
    } = renderHook(() => useNotification())
    const message = 'Test message'
    const type = 'warning'

    notification.showMessage(message, type, false)

    const expectedCloseAction = undefined
    expect(enqueueSpy).toHaveBeenCalledWith(message, { variant: type, action: expectedCloseAction })
  })

  it('should show an ERROR message without the close button', () => {
    const {
      result: { current: notification },
    } = renderHook(() => useNotification())
    const message = 'Test message'

    notification.showErrorMessage(message, false)

    const expectedCloseAction = undefined
    expect(enqueueSpy).toHaveBeenCalledWith(message, { variant: 'error', action: expectedCloseAction })
  })

  it('should show an SUCCESS message without the close button', () => {
    const {
      result: { current: notification },
    } = renderHook(() => useNotification())
    const message = 'Test message'

    notification.showSuccessMessage(message, false)

    const expectedCloseAction = undefined
    expect(enqueueSpy).toHaveBeenCalledWith(message, { variant: 'success', action: expectedCloseAction })
  })
})
